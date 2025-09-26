require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const { attachUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS: allow React dev server and include credentials for cookies
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// attach user from token if present (sets req.user and res.locals)
app.use(attachUser);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// simple health
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// DB + start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('DB connect error', err);
  });
