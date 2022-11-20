const projects = require("../models/projects");
const axios= require('axios');
const { sendEmail, sendCustomMail } = require("../Lib/email");
const client = require("../models/client");
const  addEditProject = async(req,res,next)=>{

  let payloadData = req.body
  try {
    if(payloadData.id){
       delete payloadData.id
      let project = await projects.findByIdAndUpdate(req.body.id,payloadData,{new: true})
      return res.status(200).json(project)
    }
    let project = new projects(payloadData)
    await project.save()
    return res.status(200).json(project)
  } catch (error) {
   return  res.status(400).json({
      message : "Error",
      error : error
    })
  }

}
const getProjects= async(req,res)=>{
  let payloadData = req.query
  let criteria ={
    isDeleted : false,
    isBlocked : false,
    status : payloadData.status?payloadData.status : 1
  }
  let options ={
    sort : {
      _id :-1
    },
    skip : 0,
    limit : 15
    
  }

  try {
    if(payloadData.projectId)
    criteria._id = payloadData.projectId
    if(payloadData.userId)
    criteria.userId =payloadData.userId
    if(payloadData.clientId)
    criteria.clientId = payloadData.clientId
    if(payloadData.skip)
    options.skip= payloadData.skip
    if(payloadData.limit)
    options.limit= payloadData.limit
  console.log(criteria)
    let project = await projects.find(criteria,{},options).populate({
      path : 'clientId',
      modal : client
    })
   return res.status(200).json({
      projects : project
    }
      
    )
    
  } catch (error) {
   return res.status(400).json({
      message : "Error",
      error : error
    })
  }
}
const addClient = async(req,res)=>{
  let payloadData= req.body
  delete payloadData.projectId
  try {
    let newClient = new client(payloadData)
    await newClient.save();
   return res.status(200).json(newClient)
  } catch (error) {
   return res.status(400).json({
      message : "Error",
      error : error
    })
  }
}
const addRoom = async(req,res,next)=>{
let payloadData = req.body 
try {
  let room = await projects.findByIdAndUpdate(payloadData.projectId,{
    $addToSet : {rooms : payloadData.roomData}
  },{new : true})
  if(room)
     return res.status(200).json(room)
  
} catch (error) {
  return res.status(400).json({
    message : "Error",
    error : error
  })
}

}
const shareProject = async(req,res,next)=>{
     try {
      let payloadData= req.body
     
     
      let project = await projects.findById(payloadData.projectId).populate({
        modal: client,
        path : 'clientId'
      })
      let designer = await axios.get(`https://pro-api.idesign.market/api/getDesigner?designerId=${project?.userId}`)
      console.log(designer)
      let designerName = designer?.data?.data?.companyName||designer?.data?.data?.fullName
      let link = `https://www.idesign.market/pmt-beta/${project?._id}`
      let emailBody = `Hi,</p>
      <p>Pls log in through this ${link} to access the project microsite. </p>
      <p>Please contact me if you have any further questions about the project.</p>
      <p>Thank You!</p>
      <p>${designerName}</p>`;
      let subject =`Login to Access: Project Created by ${designerName}`
      await sendCustomMail(designerName, project?.clientId?.email,subject,emailBody)
      const data = await projects.findByIdAndUpdate(payloadData.projectId,{
        isSharedToClient : true
      },{new : true}).populate({
        modal: client,
        path : 'clientId'
      })
      return res.status(200).send(data)
     } catch (error) {
      return res.status(400).json({
        message : "Error",
        error : error
      })
     }
}
const verifyUser = async(req,res,next)=>{
  let payloadData= req.query

  try {
    let criteria ={
      isDeleted : false,
      isBlocked : false,
      _id : payloadData.projectId   
    }
    
    let project = await projects.find(criteria)
    if(project.isClientVerified)
      return res.status(200).json({
        message : "Client is Verified"
      })
      else 
      return res.status(203).json({
        message : "Client is Not Verified"
      })
    
  } catch (error) {
    return res.status(400).json({
      message : "Error",
      error : error
    })
  }
}
const sendOTP = async(req,res,next)=>{
  try {
   let data= await axios.post('https://email-api.idesign.market/api/send',{
      email : req.body.email
     })
     if(data.data)
     return res.status(200).json(data.data)
    
  } catch (error) {
    return res.status(400).json({
      message : "Error",
      error : error
    })
  }
  
}
const verifyOTP= async(req,res,next)=>{
  try {
    let data= await axios.post('https://email-api.idesign.market/api/verify',{
      email : req.body.email,
      otp : req.body.otp
     })
     if(data.data.message=='Success'){
        await projects.findByIdAndUpdate(req.body.projectId,{
          isClientVerified : true
        },{new: true})
     }
     
     return res.status(200).json(data.data)
  
    
  } catch (error) {
    return res.status(400).json({
      message : "Error",
      error : error
    })
  }
}
const getClients= async(req,res)=>{
  let payloadData = req.query
  let criteria ={}


  try {

    if(payloadData.clientId)
    criteria._id =payloadData.clientId
    if(payloadData.homeOwner_id)
    criteria.homeOwner_id = payloadData.homeOwner_id
    if(payloadData.email)
    criteria.email = payloadData.email
    if(payloadData.city)
    criteria.city = new RegExp('^'+payloadData.city,'i')
  console.log(criteria)
    let clients = await client.find(criteria)
   return res.status(200).json({
      clients : clients
    }
      
    )
    
  } catch (error) {
   return res.status(400).json({
      message : "Error",
      error : error
    })
  }
}
module.exports = {
  addEditProject,
  getProjects,
  addClient,
  addRoom,
  shareProject,
  verifyUser,
  sendOTP,
  verifyOTP,
  getClients
};
