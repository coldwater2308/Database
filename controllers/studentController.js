const application = require("../models/projects");
const axios= require('axios');
const { sendEmail, sendCustomMail } = require("../Lib/email");
const client = require("../models/client");
const register = async (req,res,next)=>{

}

const addEditBasicDetails = async (req,res,next)=>{

}
const addEdit = async (req,res,next)=>{

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
