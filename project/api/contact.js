const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Required: name, email, message' });
    }

    // create transporter using SMTP settings from env
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpSecure = (process.env.SMTP_SECURE === 'true') && smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      requireTLS: smtpPort === 587,
      tls: { rejectUnauthorized: false },
      family: 4,
      name: process.env.HELO_NAME || 'sparkedgeelectrical.com',
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject || 'New message from website'}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nMessage:\n${message}`,
      html: `<h3>New contact submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || ''}</p>
             <p><strong>Message:</strong></p>
             <p>${(message || '').replace(/\n/g,'<br/>')}</p>
             <hr/><p>Received: ${new Date().toLocaleString()}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, message: 'Email sent', id: info && info.messageId });
  } catch (err) {
    console.error('Vercel function /api/contact error:', err && err.message);
    return res.status(500).json({ ok: false, error: 'Server error sending email', details: err && err.message });
  }
};
