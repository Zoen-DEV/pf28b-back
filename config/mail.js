require('dotenv').config();
const nodemailer = require("nodemailer");
const { email, adminApi } = process.env

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email,
    pass: adminApi,
  },
});
