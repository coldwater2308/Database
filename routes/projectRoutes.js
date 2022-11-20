const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const projectControllers = require("../controllers/projectControllers");

router.post('/addEditProject',auth,projectControllers.addEditProject)
router.get('/getProjects' ,projectControllers.getProjects )
router.post('/addClient',auth ,projectControllers.addClient )
router.get('/getClients',auth,projectControllers.getClients)
router.post('/addRoom',auth,projectControllers.addRoom)
router.post('/shareProject' , auth,projectControllers.shareProject)
router.get('/verifyUser' , projectControllers.verifyUser)
router.post('/sendOTP',projectControllers.sendOTP)
router.post('/verifyOTP', projectControllers.verifyOTP)
module.exports = router;
