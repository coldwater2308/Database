const mongoose = require("mongoose");
let Schema = mongoose.Schema;
var projectsSchema = new mongoose.Schema(
  {
    userId : {type : String},
    clientId :  {type : Schema.ObjectId, ref:"Client"},
    name : {type : String},
    city:{type : String},
    location : {type : String},
    pincode : {type : Number},
   status : {type : Number,default:1},   //1-Ongoing  2-Completed,
   isDeleted : {type:Boolean,default : false},
   isBlocked : {type:Boolean,default : false},
   isSharedToClient : {type:Boolean , default : false},
   isClientVerified : {type:Boolean , default : false},
   budget: {type:Number},
   rooms : [{type : String}]

  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Projects", projectsSchema);
