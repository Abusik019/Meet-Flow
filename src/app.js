const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { DB_URI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const snapshotRoutes = require('./routes/snapshotRoutes');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const { GOOGLE_CLIENT_SECRET } = require('./config');

const app = express();

// CORS
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Парсинг JSON
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/snapsot', snapshotRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Статические файлы
app.use(
    '/cache',
    express.static(path.join(__dirname, 'cache'), {
        maxAge: '1d',
        etag: true,
        index: false,
    })
);

/* OAuth Middleware */
app.use(session({
    secret: GOOGLE_CLIENT_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true только для https
}));
app.use(passport.initialize());
app.use(passport.session());

// Подключение к MongoDB
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('DB connection error:', err));

module.exports = app;
