require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9090,
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  DB_URI: process.env.DB_URI || "your_db_url",
  EMAIL_USER: process.env.EMAIL_USER || "your_email@gmail.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "your_email_password"
};
