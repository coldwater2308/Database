const mongoose = require("mongoose");
let Schema = mongoose.Schema;
var MomSchema = new mongoose.Schema(
  {
    projectId : {type : Schema.ObjectId, ref:"Projects"},
    userId : {type : String},
    date : {type : Date},
    title : {type : String},
    points : [{type:String}],
    location : {type : String},
    category: {type : String},
    isShared : {type : Boolean , default : false},
    sharedWith : [{type : Schema.ObjectId, ref:"Client"}],
    isDeleted : {type : Boolean,default : false}


  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Mom", MomSchema);
