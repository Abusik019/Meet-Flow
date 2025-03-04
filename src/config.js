require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/auth_db"
};