const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'codex_arcana_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/codex_arcana', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
