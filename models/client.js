const mongoose = require("mongoose");
let Schema = mongoose.Schema;
var clientSchema = new mongoose.Schema(
  {
    name : {type: String},
    email : {type: String},
    phoneNumber : {type: String},
    city : {type: String},
    location: {type:String},
    pincode: {type:Number}, 
    requirements : {type: String},   
    propertyType : {type: String},     
    budget : {type: String},
    propertySize : {type: Number},   
    renovationTimeline: {type:String},
    homeOwner_id: {type: Schema.ObjectId, sparse: true},        
    imageUrl : {
        original  : {type : String,default : ""},
        thumbnail : {type : String,default : ""}
    },
    coverImage : {
        original  : {type : String,default : ""},
        thumbnail : {type : String,default : ""}
    },         
    config:{type:String},      

  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Client", clientSchema);
