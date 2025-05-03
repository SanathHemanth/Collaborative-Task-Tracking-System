const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(port,(err)=>{
    if(err){
        return console.log('Something bad happened', err);
    }
    else{
        console.log(`server listening on port ${port}`);
    }
});

module.exports = app;
