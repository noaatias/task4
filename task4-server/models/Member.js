const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    name: {type:String ,required:true},
    nickName:{type:String,required:true},

    description: {type: String, required: true},
});

const Member = mongoose.model('Member', memberSchema);
module.exports = {
    Member,
}