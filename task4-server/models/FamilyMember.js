const mongoose = require('mongoose');

const familyMemberSchema = mongoose.Schema({
    name: {type:String ,required:true},
    nickName:{type:String,required:true},

    description: {type: String, required: true},
});

const FamilyMember = mongoose.model('familyMember', familyMemberSchema);
module.exports = {
    FamilyMember,
}