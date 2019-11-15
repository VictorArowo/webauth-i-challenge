const express = require('express');
const userRouter = require('./resources/users/userRouter');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(
  session({
    name: 'newSession',
    secret: ':) :(',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);
app.use('/api', userRouter);

module.exports = app;
