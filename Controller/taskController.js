
const Task = require('../Models/task');
const createTask = async (req,res) =>{
    try{
        const {title,description,dueDate,assignedTo} = req.body;
        if(!title || !dueDate || !assignedTo){
            return res.status(400).send({message : 'Invalid request'});
        }

        const taskDetails = new Task({title,description,dueDate,assignedTo});
        await taskDetails.save();
        return res.status(201).send({message : 'Task created'});
    }
    catch(error){
        res.status(400).send({ error: error.message });
    }
}

const taskAssigned = async(req,res) =>{
    try{
        const email =req.user;
        console.log(email);
        const taskDetails = await Task.find({assignedTo: email},{title:1,dueDate:1,status:1,_id:0});
        res.status(200).send(taskDetails);
    }
    catch(error){
        res.status(400).send({ error: error.message });
    }
}

const taskComplete = async(req,res)=>{
    try{
        const id = req.params.id;
        const taskDetails = await Task.find({_id:id});
        //console.log('hi',taskDetails);
        if(!taskDetails){
            res.send(400).send({message:'Invalid ID'});
        }
    }
    catch(error){
        res.status(400).send({error: error.message});
    }
}

module.exports = {createTask,taskAssigned,taskComplete};