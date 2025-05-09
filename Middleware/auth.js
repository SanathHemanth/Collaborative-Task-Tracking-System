const jwt = require('jsonwebtoken');
const {blackListedToken} = require('../Controller/userController');

const verifyJwt = (req,res,next) =>{
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send({ message: 'Access denied. No token provided' });
    }
    //console.log(blackListedToken);
    if(blackListedToken.has(token)){
        return res.status(400).send({ message: 'Invalid Token' });
    }
    try{
        const decodeToken = jwt.verify(token, process.env.JWT_Token);
        req.user = decodeToken.email;
        //console.log(req.user,req.body);
        next();
    }
    catch(error){
        console.error('JWT error:', error.message);
        res.status(400).send({ message: 'Invalid Token' });
    }
}
module.exports = {createJwt,verifyJwt};

