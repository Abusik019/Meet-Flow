require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9090,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
};
