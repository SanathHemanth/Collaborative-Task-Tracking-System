const express = require('express');
const router = express.Router();
const {createTask, taskAssigned, taskComplete} = require('../Controller/taskController');
const { verifyJwt } = require('../Middleware/auth');

router.post('/createTask',verifyJwt,createTask);
router.get('/taskAssigned',verifyJwt,taskAssigned);
router.put('/:id/taskcomplete',verifyJwt,taskComplete);
module.exports = router;