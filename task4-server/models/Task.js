const mongoose = require('mongoose');

const taskShecma = mongoose.Schema({
    descriptionOfTask: {type:String ,required:true},
    date:{type:String,required:true},

    idOfFamilyMember: {type: String, required: true},
});

const Task = mongoose.model('Task', taskShecma);
module.exports = {
    Task,
}