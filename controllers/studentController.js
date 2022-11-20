const axios= require('axios');
const student = require("../models/Student");
const document = require("../models/Document");
const application = require("../models/Application");
const basicDetails = require("../models/BasicDetails");
const feeProof = require("../models/FeeProof");
const login = async(req,res,next)=>{
  let payloadData = req.body;
  try { 
   const user =  await student.findOne({id: payloadData.id }) ; 
  
    if(user){ 
      if(await student.matchPassword(password)){
          const payload={
              id : student.id
                        } ;
          await jwt.sign(
              payload,
              process.env.STUDENT_JWT_SECRET,
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
const addEditBasicDetails = async (req,res,next)=>{
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
const addEditApplication = async(req,res,next)=>{
  let payloadData = req.body
try {
  if(payloadData.id){
    let id = payloadData.id
    delete payloadData.id
    let data = await application.findByIdAndUpdate(id,payloadData,{new: true})
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
    let data = new application(payloadData)
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
const getBasicDetails = async(req,res,next)=>{
  let payloadData = req.body
  try {
  let data = await basicDetails.findOne({studentId : payloadData.studentId});
  if(data)
  return res.status(200).json({
    message : "Success",
    data : data
  })
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }
}
const getApplication = async(req,res,next)=>{
  let payloadData = req.body
  try {
  let data = await application.findOne({studentId : payloadData.studentId});
  if(data)
  return res.status(200).json({
    message : "Success",
    data : data
  })
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }
}
const uploadDocuments = async(req,res,next)=>{
  let payloadData = req.body
  let file = req.file
  try {
    const data = await document.create({
      appId: payloadData.appId,
      file:  file.location,
      name : payloadData.name,
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
const getDocuments = async(req,res,next)=>{
  let payloadData = req.body
  try {
  let data = await documents.find({appId : payloadData.appId});
  if(data)
  return res.status(200).json({
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
  addEditBasicDetails,
  addEditApplication,
  getBasicDetails,
  getApplication,
  uploadDocuments,
  getDocuments
};
