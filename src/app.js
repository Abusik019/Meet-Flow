const express = require("express");
const mongoose = require("mongoose");
const { DB_URI } = require("./config");
const authRoutes = require("./routes/authRoutes");
const path = require('path');

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use('/cache', express.static(path.join(__dirname, 'cache'), {
  maxAge: '1d',
  etag: true,
  index: false
}));

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

module.exports = app;