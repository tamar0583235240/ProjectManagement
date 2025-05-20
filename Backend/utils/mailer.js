const nodemailer = require('nodemailer');
async function sendInviteEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
    }
  });

  const url = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'הזמנה להצטרף למערכת',
    html: `<p>שלום,</p>
           <p>קיבלת הזמנה להצטרף למערכת. לחץ/י על הקישור כדי לבחור סיסמה:</p>
           <a href="${url}">${url}</a>
           <p>הקישור תקף ל-48 שעות בלבד!.</p>`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


module.exports = sendInviteEmail;
