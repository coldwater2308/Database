const express = require("express");
const router = express.Router();
const auth = require("../middlewares/admin");
const adminController = require("../controllers/adminController");

// router.post('/addEditTimeline',auth,timelineControllers.addEditTimeline)
// router.get('/getTimelines' ,auth,timelineControllers.getTimelines )
// router.post('/addEditItems' ,auth,timelineControllers.addEditItems )
// router.get('/getItems',auth,timelineControllers.getItems) 


router.post('/addEditBasicDetails',auth,studentControllers.addEditBasicDetails)
router.post('/login',studentControllers.login)
router.get('/getDetails',auth,studentControllers.getDetails)
router.get('/getStatus',auth,studentControllers.getStatus)
module.exports = router;
