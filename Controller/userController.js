const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const {createJwt,verifyJwt} = require('../Middleware/auth');
const blackListedToken = new Set();
const jwt = require('jsonwebtoken');

const registerUser = async (req,res) =>{
    try{
        const {username,email,password,role}= req.body;
        if(!username || !email || !password || !role){
            return res.status(400).send({message : 'Invalid request'});
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).send({message: "User already exists"});
        }

        const user = new User({
            username,
            email,
            password,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user });
    }
    catch(error){
        console.log(error);
    }
}

const loginUser = async(req,res) =>{
    try{
        const {email,password}=req.body;
        const userDetails = await User.findOne({email});

        if(!userDetails){
            return res.status(401).send({message:'Invalid email or password'});
        }

        const isMatch = await userDetails.matchPassword(password);
        if(isMatch){
            createJwt(res,email);
            return res.status(200).send({message: 'login successful'});
        }
        else{
            return res.status(401).send({message:'Invalid email or password'});
    }
    }catch{
        console.log(error);
        return res.status(400).send({message: error});
    }
}

const logout = async(req,res) =>{
    const token = req.cookies.token;
    if(token){
        blackListedToken.add(token);
        // console.log(blackListedToken);
        res.clearCookie('token');
        return res.status(200).send({message:'Logout Successful'});
    }
    return res.status(400).send({message:'Invalid Token'});
}

const profile = async (req,res) =>{
    const token = req.cookies.token;
    if(token){
        if(blackListedToken.has(token)){
            return res.send(401).send('Invalid token');
        }
        verifyJwt(req,res);
    }
}

module.exports = {registerUser,loginUser,logout,profile};