const CONTACT_ENDPOINT_URL =
  process.env.CONTACT_ENDPOINT_URL ||
  "https://bvgqo6ynu7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message, website } = req.body || {};

  if (typeof website === "string" && website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }),
    });

    if (!response.ok) {
      return res
        .status(502)
        .json({ error: "Something went wrong while sending your message. Please try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res
      .status(502)
      .json({ error: "Something went wrong while sending your message. Please try again." });
  }
}
