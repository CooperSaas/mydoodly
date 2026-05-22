const HEART_COLOURS = {
  red:    '#E74C3C',
  pink:   '#FF69B4',
  purple: '#9B59B6',
  blue:   '#3498DB',
  yellow: '#F1C40F',
  orange: '#FF8C00',
  green:  '#4CAF7D',
  white:  '#e0e0e0',
};

function heartHex(name) {
  if (!name) return '#cccccc';
  return HEART_COLOURS[name.toLowerCase().trim()] || '#cccccc';
}

function waLink(phone) {
  if (!phone) return null;
  const clean = phone.replace(/\D/g, '');
  const num = clean.startsWith('0') ? '62' + clean.slice(1) : clean;
  return `https://wa.me/${num}`;
}

function row(label, value) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:8px 12px 8px 0;vertical-align:top;width:38%;font-size:12px;
                 text-transform:uppercase;letter-spacing:.06em;color:#888888;
                 font-family:'Outfit',Arial,sans-serif;white-space:nowrap;">
        ${label}
      </td>
      <td style="padding:8px 0;vertical-align:top;font-size:15px;color:#2d2d2d;
                 font-family:'Outfit',Arial,sans-serif;font-weight:500;">
        ${value}
      </td>
    </tr>`;
}

function buildEmail(order) {
  const wa   = waLink(order.phone || order.whatsapp);
  const hHex = heartHex(order.heart_colour);

  const waValue = wa
    ? `<a href="${wa}" style="color:#35A8A9;text-decoration:none;">${order.phone || order.whatsapp}</a>`
    : (order.phone || order.whatsapp || '');

  const heartValue = `
    <span style="display:inline-block;width:14px;height:14px;border-radius:50%;
                 background:${hHex};vertical-align:middle;margin-right:6px;
                 border:1px solid rgba(0,0,0,.1);"></span>
    <span style="vertical-align:middle;">${order.heart_colour || ''}</span>`;

  const drawingSection = order.drawing_url ? `
    <tr><td colspan="2" style="padding:20px 0 8px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;
                  color:#888888;font-family:'Outfit',Arial,sans-serif;margin-bottom:10px;">
        Drawing
      </div>
      <a href="${order.drawing_url}" target="_blank">
        <img src="${order.drawing_url}" alt="Child's drawing"
             style="max-width:260px;max-height:260px;border-radius:12px;
                    border:2px solid #e5e0d8;display:block;"/>
      </a>
      <div style="font-size:12px;color:#aaa;margin-top:6px;font-family:'Outfit',Arial,sans-serif;">
        Click image to view full size
      </div>
    </td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
  <title>New Order</title>
</head>
<body style="margin:0;padding:0;background:#F0E9DE;font-family:'Outfit',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background:#F0E9DE;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
             style="max-width:560px;">

        <!-- HEADER -->
        <tr><td style="background:#1a1a2e;border-radius:20px 20px 0 0;
                        padding:32px 32px 24px;text-align:center;">
          <div style="font-family:'Fredoka',Arial,sans-serif;font-size:28px;
                      font-weight:600;color:#F1624A;margin-bottom:4px;
                      letter-spacing:.01em;">
            My Doodly 🧶
          </div>
          <div style="font-size:13px;color:rgba(255,255,255,.55);
                      font-family:'Outfit',Arial,sans-serif;">
            New order notification
          </div>
        </td></tr>

        <!-- HERO BAND -->
        <tr><td style="background:#F1624A;padding:16px 32px;text-align:center;">
          <div style="font-family:'Fredoka',Arial,sans-serif;font-size:22px;
                      font-weight:600;color:#ffffff;letter-spacing:.01em;">
            New order from ${order.parent_name || 'a customer'}! 🎉
          </div>
        </td></tr>

        <!-- CARD BODY -->
        <tr><td style="background:#ffffff;padding:32px;border-radius:0 0 20px 20px;
                        box-shadow:0 4px 24px rgba(0,0,0,.07);">

          <!-- SECTION: PARENT -->
          <div style="font-family:'Fredoka',Arial,sans-serif;font-size:14px;
                      font-weight:600;color:#35A8A9;text-transform:uppercase;
                      letter-spacing:.08em;margin-bottom:10px;">
            Customer
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="margin-bottom:24px;">
            ${row('Name',      order.parent_name)}
            ${row('Email',     order.email ? `<a href="mailto:${order.email}" style="color:#35A8A9;text-decoration:none;">${order.email}</a>` : '')}
            ${row('WhatsApp',  waValue)}
            ${row('City',      order.city)}
          </table>

          <hr style="border:none;border-top:1px solid #f0ece6;margin:0 0 24px;"/>

          <!-- SECTION: DOODLE -->
          <div style="font-family:'Fredoka',Arial,sans-serif;font-size:14px;
                      font-weight:600;color:#35A8A9;text-transform:uppercase;
                      letter-spacing:.08em;margin-bottom:10px;">
            The Doodle
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="margin-bottom:24px;">
            ${row('Child',       order.child_name)}
            ${row('Age',         order.child_age ? order.child_age + ' years old' : '')}
            ${row('Size',        order.doodle_size)}
            ${row('Toy name',    order.toy_name || order.character_name)}
            ${row('Heart',       heartValue)}
            ${row('Colours',     order.colour_notes)}
            ${row('Extra notes', order.extra_notes)}
            ${drawingSection}
          </table>

          <!-- CTA BUTTON -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center" style="padding:8px 0 16px;">
              <a href="https://mydoodly.vercel.app/admin.html"
                 style="display:inline-block;background:#35A8A9;color:#ffffff;
                        font-family:'Fredoka',Arial,sans-serif;font-size:17px;
                        font-weight:600;padding:14px 36px;border-radius:50px;
                        text-decoration:none;letter-spacing:.02em;">
                View All Orders →
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="padding:20px 0;text-align:center;">
          <div style="font-size:13px;color:#a09080;font-family:'Outfit',Arial,sans-serif;">
            My Doodly &middot; Handmade in Bali 🌿
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const order = req.body || {};
  const parentName = order.parent_name || 'Customer';
  const subject = `🧶 New Doodly Order from ${parentName}!`;
  const htmlContent = buildEmail(order);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    'My Doodly <orders@mydoodly.com>',
      to:      'kaylacooper.indo@gmail.com',
      subject: subject,
      html:    htmlContent,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email failed', detail: err });
  }

  return res.status(200).json({ ok: true });
};
