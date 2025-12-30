const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    name, phone, email, street, house, flat, tariff, iptv, orderId
  } = req.body || {};

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT || 587;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const EMAIL_FROM = process.env.EMAIL_FROM || (SMTP_USER || 'no-reply@example.com');
  const EMAIL_TO = process.env.EMAIL_TO;

  // EmailJS server-side option
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

  // If EmailJS server credentials are provided, attempt EmailJS REST API first
  if (EMAILJS_PRIVATE_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
    try {
      const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY || undefined,
        template_params: {
          name: name || '',
          phone: phone || '',
          email: email || '',
          street: street || '',
          house: house || '',
          flat: flat || '',
          tariff: tariff || '',
          iptv: iptv || '',
          orderId: orderId || '',
        },
      };

      const resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${EMAILJS_PRIVATE_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error('EmailJS send failed', resp.status, text);
        // fallthrough to SMTP if configured
      } else {
        res.status(200).json({ ok: true });
        return;
      }
    } catch (err) {
      console.error('EmailJS API error', err && err.message);
      // fallthrough to SMTP
    }
  }

  // Fallback to SMTP if configured
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) {
    res.status(500).json({ error: 'SMTP or EMAILJS not configured' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `Нова заявка на підключення ${orderId || ''}`;
  const text = `Ім'я: ${name}\nТелефон: ${phone}\nEmail: ${email || ''}\nВулиця: ${street}\nБудинок: ${house || ''}\nКвартира: ${flat || ''}\nТариф: ${tariff || ''}\nIPTV: ${iptv || ''}\nНомер заявки: ${orderId || ''}`;

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject,
      text,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-order error', err && err.message);
    res.status(500).json({ error: 'send_failed' });
  }
};
