
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BasicDetails = new Schema({
        fullName : String,
        firstName : String,
        lastName : String,
        fatherName : String,
        motherName : String,
        aadharNo : Number,
        josaaAppNo : String,
        allIndiaRank : Number,
        categoryRank:Number,
        branchAllotted : String,
        dob : Date,
        studentId : {type: Schema.ObjectId,ref:'Student',sparse :true},
},{
    timestamps : true
});

module.exports = mongoose.model('BasicDetails', BasicDetails);