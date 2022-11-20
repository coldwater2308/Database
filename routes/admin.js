const express = require("express");
const router = express.Router();
const auth = require("../middlewares/admin");
const adminController = require("../controllers/adminController");
const studentController = require("../controllers/studentController");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
});


const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "3d-idesign",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+path.extname(file.originalname));
    },
  }),
});

//login for admin
router.post('/login',adminController.login)
//add allotted Students through sheets
router.post('/addStudents',auth,adminController.addStudents)
//get details of particular Student
router.get('/getDetails',auth,studentController.getDetails)
//get application of particular Student
router.get('/getApplication',auth,studentController.getApplication)
//get uploaded document of particular Student
router.get('/getDocuments',auth,studentController.getDocuments)
//review application of particular Student
router.post('/reviewApplication',auth,adminController.reviewApplication)
//review  document of particular application
router.post('/reviewDocument',auth,adminController.reviewDocument)
//add Fees 
router.post('/addFees',auth,upload.single("file", 1),adminController.addFees)
//verify feeProof
router.post('/reviewFeeProof',auth , adminController,reviewFeeProof)


module.exports = router;
