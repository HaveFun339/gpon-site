Email delivery setup (serverless)

Overview
- The project includes a serverless endpoint at `api/send-order.js` which sends emails using SMTP via `nodemailer`.
- The client posts order data to `/api/send-order`. If the endpoint fails, the client falls back to opening a `mailto:` link and copies the order text to clipboard.

Required environment variables
- For local dev (example `.env` — do not commit real secrets):
-  - `VITE_CONTACT_EMAILS` — (optional) comma-separated emails used by client fallback (visible in bundle).
-  - `SMTP_HOST` — SMTP server host (e.g. smtp.mailtrap.io)
-  - `SMTP_PORT` — SMTP port (e.g. 587)
-  - `SMTP_USER` — SMTP username
-  - `SMTP_PASS` — SMTP password
-  - `EMAIL_FROM` — optional "from" email address used in outgoing mail
-  - `EMAIL_TO` — comma-separated recipient emails (server-side only)
-
-EmailJS server-side option
-  - `EMAILJS_SERVICE_ID` — EmailJS service id (e.g. service_xxx)
-  - `EMAILJS_TEMPLATE_ID` — EmailJS template id (e.g. template_xxx)
-  - `EMAILJS_PRIVATE_KEY` — EmailJS private key (server-side only)
-  - `EMAILJS_PUBLIC_KEY` — optional public key (not required server-side)

Local testing
1. Copy `.env.example` to `.env` and fill credentials (do NOT commit `.env`).
2. Start dev with Vercel's local server to run serverless functions:

```bash
# install deps
pnpm install
# run vercel dev (recommended) so /api/* endpoints are available locally
npx vercel dev
```

Alternatively, if you don't run `vercel dev`, the `/api/send-order` endpoint won't be available in `pnpm dev` (Vite). Use the `mailto` fallback for manual testing.

Test via curl (after `vercel dev` or deployed):

```bash
curl -X POST http://localhost:3000/api/send-order \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"+380501234567","email":"test@example.com","street":"Test","house":"1","flat":"1","tariff":"GPON 100","iptv":"Легка","orderId":"ORD-123" }'
```

Deployment (Vercel)
1. Push to your Git provider and import project to Vercel.
2. In Vercel Project Settings → Environment Variables, add:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_TO` (comma-separated), and optionally `EMAIL_FROM`.
3. Deploy. The serverless endpoint will be available at `https://<your-deployment>/api/send-order` and the client will POST there automatically.

Security notes
- Keep SMTP credentials and `EMAIL_TO` only in server-side env vars (Vercel ENV). Do NOT place them in client-side envs (VITE_*) if you want them to remain secret.
- If you need a solution that doesn't require SMTP, consider Formspree or a webhook to an external service. I can help integrate one.

If you want, I can:
- Configure `Input.jsx` to hide all emails entirely (use only server-side `EMAIL_TO` and do not expose `VITE_CONTACT_EMAILS`).
- Add a small admin page to list orders (requires a lightweight server or persistent DB).
