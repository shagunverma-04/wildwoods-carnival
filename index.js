const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
});

// Handle registration POST request
app.post('/register', async (req, res) => {
  const { name, email } = req.body;

  // Create reusable transporter object using Gmail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gmail4@gmail.com', // 🔐 Replace with your email
      pass: 'googleapp',     // 🔐 Use Gmail App Password
    },
  });

  let mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'Registration Successful',
    text: `Hi ${name},\n\nThank you for registering!\n\nSee you at the event.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Registration successful! Email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Registration saved but email failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
