const nodemailer = require('nodemailer');

const sendInviteEmail=async (email, token, customHtml, subject = 'הזמנה להצטרף למערכת')=> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: customHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
module.exports = sendInviteEmail;
