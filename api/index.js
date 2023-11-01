const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000; // Változtasd meg szükség esetén

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

// Kezeld az űrlap beküldését
app.get("/", (req, res) => {
  return res.send({ success: true, msg: "alma" });
});
app.post("/send-email", (req, res) => {
  // Feldolgozzuk az űrlap adatait
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  if (!name || !email || !message) {
    return res.status(400).redirect("http://127.0.0.1:5500/error.html");
  }
  // Email beállítások
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // Email küldése
  const mailOptions = {
    from: email,
    to: process.env.USER,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).redirect("http://127.0.0.1:5500/error.html");
    } else {
      res.status(200).redirect("http://127.0.0.1:5500/thank_you.html");
    }
  });
});

// Indítsd el a szerveredet
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
