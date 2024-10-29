
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email provider
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS,
  },
});

function sendVerificationEmail(userEmail, verifyCode) {
  const verificationLink = `http://10.10.1.166:3000/verify-email?verifyCode=${verifyCode}`;

  const mailOptions = {
    from: process.env.EMAIL_ADD,
    to: userEmail,
    subject: 'Verify your email address',
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
