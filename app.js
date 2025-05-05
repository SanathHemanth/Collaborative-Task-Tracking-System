const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnection = require('./util/database');
const app = express();
const port = 3000;
const userRoute = require('./Routes/userRoutes');
require('dotenv').config();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

const logger = (req,res,next)=>{
    console.log(`${req.method} : Request received on ${req.url}`);
    next();
}

app.use(logger);

app.get('/',(req,res)=>{
    res.send('Collaborative Task Tracking System');
})

app.use('/user',userRoute);

app.listen(port,(err)=>{
    if(err){
        return console.log('Something bad happened', err);
    }
    else{
        console.log(`server listening on port ${port}`);
    }
});

module.exports = app;
