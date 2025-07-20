
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use custom SMTP
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your-app-password', // Use an App Password if Gmail 2FA is enabled
  },
});

function sendReceipt(to, name, eventName) {
  const mailOptions = {
    from: 'your.email@gmail.com',
    to,
    subject: `Receipt: Registered for ${eventName}`,
    html: `<h3>Hi ${name},</h3><p>Thank you for registering for <strong>${eventName}</strong>!<br>This email is your confirmation receipt.</p>`,
  };

  return transporter.sendMail(mailOptions); // returns a Promise
}

module.exports = sendReceipt;
