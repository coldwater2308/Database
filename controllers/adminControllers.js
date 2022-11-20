const axios= require('axios');
const student = require("../models/student");
const admin = require("../models/admin");
const document = require("../models/document");
const application = require("../models/application");
const basicDetails = require("../models/basicDetails");

const login = async(req,res,next)=>{
  let payloadData = req.body;
  try { 
   const admin =  await admin.findOne({id: payloadData.id }) ; 
  
    if(admin){ 
      if(await admin.matchPassword(payloadData.password)){
          const payload={
              id : admin.id
                        } ;
          await jwt.sign(
              payload,
              process.env.ADMIN_JWT_SECRET,
              {expiresIn:86400},
              (error,token)=>{
                  if(error)
                      return res.json({message:error});
                  return res.json({
                      message :"Success",
                      token : "Bearer " + token
                  });
  
              }
          )

  
       }
      else { 
          console.log("Wrong Password");
      res.status(400).json({error: "Wrong password"});
      
    }
    } 
    else { 
        res.status(400).json({error : "Wrong ID"});
        
    }
      
  } catch (error)
  {
     return res.status(200).json(error); 
  } 
}
const addStudents = async (req,res,next)=>{
  let payloadData = req.body 
  try {
    if(payloadData.id){
      let id = payloadData.id
      delete payloadData.id
      let data = await basicDetails.findByIdAndUpdate(id,payloadData,{new: true})
      if(data)
      return res.status(200).json({
        message:"Success"
      })
      else 
      return res.status(203).json({
        message:"Something Went Wrong"
      })

    } 
    else {
      let data = new basicDetails(payloadData)
      await data.save()
      return res.status(200).json({
        message: "Success",
        data : data
      })
    }
  
    
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }


}

const addFees = async(req,res,next)=>{
  let payloadData = req.body
  let file = req.file
  try {
    const data = await fees.create({
      file:  file.location,
      batch : payloadData.batch,
      sem : payloadData.sem,
      amount : payloadData.amount,
      batch : payloadData.batch,
      type  : payloadData.type
    });
    res.status(200).json({
      message : "Success",
      data : data
    })
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }
}



module.exports = {
  login,
  reviewApplication,
  addStudents,
  getStudents,
  reviewDocument,
  addFees,
  reviewFeeProof
};
