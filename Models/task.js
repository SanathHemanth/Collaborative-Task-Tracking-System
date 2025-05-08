const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    assignedTo: { type: String, required: true },
    status: { type: String, enum: ['open','completed'], default:'open'}
},
{ timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);