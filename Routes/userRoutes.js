const express = require('express');
const router = express.Router();
const user = require('../Models/user');
const auth =  require('../Middleware/auth');
const {verifyJwt} = require('../Middleware/auth');
const {registerUser,loginUser,logout,profile,updateProfile} = require('../Controller/userController')



router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.post('/updateProfile',verifyJwt,updateProfile);
router.get('/profile',verifyJwt,profile);


module.exports = router;