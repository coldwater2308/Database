const axios= require('axios');
const mongoXlsx = require('mongo-xlsx')
const student = require("../models/Student");
const document = require("../models/Document");
const application = require("../models/Application");
const basicDetails = require("../models/BasicDetails");
const feeProof = require("../models/FeeProof");
const fees = require("../models/Fees");

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
  const xlsxFile = req.file.path
  try {
    mongoXlsx.xlsx2MongoData(xlsxFile, null, async (err,data) => {
      // console.log(data);
      // res.send(data)
      if(err)
      return res.status(200).json(err)
   
      let students = await student.insertMany(data)
      
    })
    return res.status(200).json({})
    
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }


}

const getStudents = async(req,res,next)=>{
  let payloadData = req.body
  try {
    let criteria = {

    }
    let options = {
      limit : 10,
      sort: {
        _id : -1
      }
    }
    if(payloadData.skip)
    options.skip = payloadData.skip

    if(payloadData.limit)
    options.skip = payloadData.limit
    
    if(payloadData.studentId)
    criteria.id = payloadData.studentId

    let data = await students.find(criteria , projection , options)
    return res.status(200).json({
      message : 'Success',
      data : data
    })
    
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
      batch : payloadData.batch
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
const reviewApplication =async(req,res,next)=>{
try {
  let payloadData = req.body
  let dataToUpdate={

  }
if(payloadData.status){
  dataToUpdate['$set'] ={
    status :payloadData.status
  }
}

if(payloadData.remark){
  dataToUpdate['$addToSet'] ={
    status :payloadData.status
  }
} 
let data = await application.findByIdAndUpdate(payloadData.id,dataToUpdate,{new: true});
if(data)
return res.status(200).json({
  message: "Success"
})
else 
return res.status(203).json({
  message: "Something Went Wrong"
})

  
} catch (error) {
  res.status(400).json({
    error : error
  })
}
}

const reviewDocument =async(req,res,next)=>{
  try {
    let payloadData = req.body
    let dataToUpdate={
  
    }
  if(payloadData.status){
    dataToUpdate['$set'] ={
      status :payloadData.status
    }
  }
  
  if(payloadData.remark){
    dataToUpdate['$addToSet'] ={
      status :payloadData.status
    }
  } 
  let data = await document.findByIdAndUpdate(payloadData.id,dataToUpdate,{new: true});
  if(data)
  return res.status(200).json({
    message: "Success"
  })
  else 
  return res.status(203).json({
    message: "Something Went Wrong"
  })
  
    
  } catch (error) {
    res.status(400).json({
      error : error
    })
  }
  }

const reviewFeeProof =async(req,res,next)=>{
    try {
      let payloadData = req.body
      let dataToUpdate={
    
      }
    if(payloadData.status){
      dataToUpdate['$set'] ={
        status :payloadData.status
      }
    }
    
    if(payloadData.remark){
      dataToUpdate['$addToSet'] ={
        status :payloadData.status
      }
    } 
    let data = await feeProof.findByIdAndUpdate(payloadData.id,dataToUpdate,{new: true});
    if(data)
    return res.status(200).json({
      message: "Success"
    })
    else 
    return res.status(203).json({
      message: "Something Went Wrong"
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
