import nodemailer from "nodemailer";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const SMTP_SEND_TIMEOUT_MS = 10 * 1000;

const rateLimitStore = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers?.["x-forwarded-for"];

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0].split(",")[0].trim();
  }

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(clientIp, now) {
  const existing = rateLimitStore.get(clientIp);

  if (!existing || now - existing.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, windowStart: now });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(clientIp, existing);

  return false;
}

function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("SMTP send timeout"));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

function isPayloadInvalid(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return true;
  }

  const { name, email, message, website } = body;

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return true;
  }

  if (typeof website !== "undefined" && typeof website !== "string") {
    return true;
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000 || website?.length > 255) {
    return true;
  }

  return false;
}

function logSendFailure(error, context) {
  console.error("[api/contact] Failed to send contact email", {
    ip: context.ip,
    errorName: error?.name,
    errorMessage: error?.message,
    errorCode: error?.code,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const clientIp = getClientIp(req);
  const now = Date.now();

  if (isRateLimited(clientIp, now)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  if (isPayloadInvalid(req.body)) {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const { name, email, message, website } = req.body || {};
  const trimmedName = name?.trim() || "";
  const trimmedEmail = email?.trim() || "";
  const trimmedMessage = message?.trim() || "";

  if (typeof website === "string" && website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || smtpUser;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

  try {
    if (!smtpHost || !contactToEmail || !contactFromEmail) {
      return res
        .status(500)
        .json({ error: "Something went wrong while sending your message. Please try again." });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth:
        smtpUser && smtpPass
          ? {
              user: smtpUser,
              pass: smtpPass,
            }
          : undefined,
    });

    await withTimeout(
      transporter.sendMail({
        from: contactFromEmail,
        to: contactToEmail,
        replyTo: trimmedEmail,
        subject: `New portfolio contact message from ${trimmedName}`,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
        html: `<p><strong>Name:</strong> ${trimmedName}</p><p><strong>Email:</strong> ${trimmedEmail}</p><p><strong>Message:</strong><br/>${trimmedMessage.replace(/\n/g, "<br/>")}</p>`,
      }),
      SMTP_SEND_TIMEOUT_MS
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    logSendFailure(error, { ip: clientIp });
    return res
      .status(502)
      .json({ error: "Something went wrong while sending your message. Please try again." });
  }
}
