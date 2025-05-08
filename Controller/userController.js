const express = require('express');
const router = express.Router();
const User = require('../Models/user');
// const {verifyJwt} = require('../Middleware/auth');
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
            const token = jwt.sign({email},process.env.JWT_Token,{expiresIn: "1d"});
            return res.status(200).send({token});
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
    const token = req.headers["authorization"];
    if(token){
        blackListedToken.add(token);
        console.log(blackListedToken);
        res.clearCookie('token');
        return res.status(200).send({message:'Logout Successful'});
    }
    return res.status(400).send({message:'Invalid Token'});
}

const profile = async (req,res) =>{
    console.log(req.user);
    try{
        const userDetails = await User.findOne({email: req.user});
        //console.log(userDetails);
        res.status(200).send({username: userDetails.username,
        email : userDetails.email,
        role : userDetails.role
    });
    }
    catch(error){
        console.log(error);
        return res.status(400).send({message: error});
    }
}

const updateProfile = async (req,res) =>{
    const {username,role} = req.body;
    console.log(username,role);
    try{
        const userDetails = await User.findOne({email: req.user});
        console.log(userDetails);
        userDetails.username = username;
        userDetails.role = role;
        //console.log(userDetails);
        const updatedUser = await userDetails.save();
        return res.status(201).send({message: 'Profile Updated Successfully'});
    }
    catch{
        return res.status(400).send({message: error});
    }
}

module.exports = {registerUser,loginUser,logout,profile,updateProfile,blackListedToken};