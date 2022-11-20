
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Admin = new Schema({
    id : {type : String, required : true,unique : true},
    email : {type : String},
    password : {type : String}

},{
    timestamps : true
});

module.exports = mongoose.model('Admin', Admin);