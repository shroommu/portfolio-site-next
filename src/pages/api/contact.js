import nodemailer from "nodemailer";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
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

    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: trimmedEmail,
      subject: `New portfolio contact message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `<p><strong>Name:</strong> ${trimmedName}</p><p><strong>Email:</strong> ${trimmedEmail}</p><p><strong>Message:</strong><br/>${trimmedMessage.replace(/\n/g, "<br/>")}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res
      .status(502)
      .json({ error: "Something went wrong while sending your message. Please try again." });
  }
}
