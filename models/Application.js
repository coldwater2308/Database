let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Application = new Schema({
     studentId : {type: Schema.ObjectId,ref:'Student',sparse :true},
     status : {type : Number , default : 0},     // 0-Not Submitted 1-Inprocess 2-Approved 3-Rejected
     remarks : [{remark : String, time : Date}],
},{
    timestamps : true
});

module.exports = mongoose.model('Application', Application);