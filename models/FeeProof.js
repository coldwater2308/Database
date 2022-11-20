
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FeeProof = new Schema({

     file: {type : String},
     feeId : {type: Schema.ObjectId,ref:'Fees',sparse :true},
     year : {type : Number},
     utrNumber : {type : String},
     refNumber : {type : String},
     status : {type : Number , default : 0},
     remarks : [{remark : String, time : Date}],
     studentId : {type: Schema.ObjectId,ref:'Student',sparse :true}
    
},{
    timestamps : true
});

module.exports = mongoose.model('FeeProof', FeeProof);