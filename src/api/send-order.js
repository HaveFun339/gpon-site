

export async function sendtoTelegram(text, chatId) {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
  const DEFAULT_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const TELEGRAM_CHAT_ID = chatId || DEFAULT_CHAT_ID;
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      console.log(tgUrl)
      const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: `Нова заявка:\n${text}`,
        parse_mode: 'HTML',
      };
      const tgResp = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
//         return fetch(telegramUrl, {
//     method: 'POST',
//   body: new URLSearchParams({
//     chat_id: '5499738556',
//     text: 'SAM TY Black',

//   }),
// });

      if (!tgResp.ok) {
        const body = await tgResp.text();
        console.error('Telegram send failed', tgResp.status, body);
      }
    } catch (err) {
      console.error('Telegram API error', err && err.message);
    }
  }

}