const express = require('express');
const router = express.Router();
const user = require('../Models/user');
const auth =  require('../Middleware/auth');
const {registerUser,loginUser,logout,profile} = require('../Controller/userController')



router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/profile',profile);

module.exports = router;