const express = require("express");
const mongoose = require("mongoose");
const { DB_URI } = require("./config");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

module.exports = app;