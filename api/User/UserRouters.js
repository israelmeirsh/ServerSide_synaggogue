const express = require('express');
const router = express.Router();
const UserController  = require('./UserController.js');

router.post('/register', UserController.register);


module.exports = router;

