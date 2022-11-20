
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Student = new Schema({
    id : {type : String, required : true,unique : true},
    branch : {type : String , required : true},    //Current Branch
    email : {type : String},
    status : {type : Number},
    isApproved : {type : Boolean , default : false},
    password : {type : String}

},{
    timestamps : true
});

module.exports = mongoose.model('Student', Student);