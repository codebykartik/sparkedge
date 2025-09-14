const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

function sanitizeInput(str) {
  if (!str) return '';
  return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}



// Debug print of SMTP env (for troubleshooting)
console.log('SMTP config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  user: process.env.SMTP_USER ? '***REDACTED***' : undefined,
  email_to: process.env.EMAIL_TO,
});

// Create transporter with smarter defaults: if port 587 use secure=false and requireTLS (STARTTLS)
// Force IPv4 (family: 4) and set 'name' to a valid FQDN so EHLO/HELO is accepted by strict SMTP servers.
// Adjust greetingTimeout to avoid slow-start issues.
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = (process.env.SMTP_SECURE === 'true') && smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for other ports (STARTTLS will be used)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: smtpPort === 587,
  tls: {
    // Allow self-signed certs if necessary (useful for some hosting providers).
    rejectUnauthorized: false
  },
  // Force IPv4 to avoid IPv6/::1 resolution issues.
  family: 4,
  // IMPORTANT: set a valid hostname (FQDN) that will be used in EHLO/HELO command.
  // Use your domain name here (sparkedgeelectrical.com) so Rediff accepts the HELO.
  name: process.env.HELO_NAME || 'sparkedgeelectrical.com',
  greetingTimeout: 20000
});



transporter.verify(function (error, success) {
  if (error) {
    console.warn('Warning: SMTP connection could not be verified at startup:', error && error.message);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'SparkEdge contact-backend running' });
});

app.post('/contact', async (req, res) => {
  try {
    const name = sanitizeInput(req.body.name);
    const email = sanitizeInput(req.body.email);
    const phone = sanitizeInput(req.body.phone);
    const subject = sanitizeInput(req.body.subject) || 'New contact form submission';
    const message = sanitizeInput(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Required fields: name, email, message' });
    }

    const htmlBody = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p>Received at: ${new Date().toLocaleString()}</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage:\n${message}`,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info && info.messageId);
    return res.json({ ok: true, message: 'Form submitted and email sent' });
  } catch (err) {
    console.error('Error in /contact:', err && err.message);
    return res.status(500).json({ ok: false, error: 'Server error. Could not send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
