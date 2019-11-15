const express = require('express');
const router = express.Router();
const { login, logout, signup, getUsers } = require('./userController');
const { protected } = require('./userMiddlewares');

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);
router.get('/users', protected, getUsers);

module.exports = router;
