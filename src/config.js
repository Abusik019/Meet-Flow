require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9090,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
};
