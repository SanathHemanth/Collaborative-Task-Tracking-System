const jwt = require('jsonwebtoken');

const createJwt = (res,email) =>{
    const token = jwt.sign({email},process.env.JWT_Token,{expiresIn: "1d"});

    res.cookie("token",token,{
        //httpOnly : true,
        maxAge: 24 * 60 * 60 * 1000
    });
}

const verifyJwt = async(req,res) =>{
    let token = req.cookies.token;
    console.log(token);
}

module.exports = {createJwt,verifyJwt};