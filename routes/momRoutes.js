const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const projectControllers = require("../controllers/projectControllers");
const momControllers= require('../controllers/momControllers')
//add Edit MOM
router.post('/addEditMOM',momControllers.addEditMOM)
//Get MOM
router.get('/getMOM',momControllers.getMOM)
//Delete MOMS
router.put('/deleteMOMs',momControllers.deleteMOMs)
module.exports = router;
