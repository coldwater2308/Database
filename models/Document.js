
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Document = new Schema({

     file: {type : String},
     year : {type : Number},
     name : {type : String},
     number : {type : Number},
     status : {type : Number , default : 0},
     remarks : [{remark : String, time : Date}],
     appId : {type: Schema.ObjectId,ref:'Application',sparse :true}
    
},{
    timestamps : true
});

module.exports = mongoose.model('Document', Document);