const express = require("express");
const router = express.Router();
const auth = require("../middlewares/student");
const studentControllers = require("../controllers/studentController");
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

router.post('/login',studentControllers.login)
router.post('/addEditBasicDetails',auth,studentControllers.addEditBasicDetails)
router.post('/addEditApplication',auth, studentControllers.addEditApplication)
router.get('/getBasicDetails',auth,studentControllers.getBasicDetails)
router.get('/getApplication',auth, studentControllers.getApplication)
router.get('/uploadDocuments',auth,upload.single("file", 1),studentControllers.uploadDocuments)
router.get('/getDocuments',auth,studentControllers.getDocuments)
router.post('/uploadFeeProof',auth,upload.single("file", 1),studentControllers.uploadFeeProof)
router.get('/getFeeStatus',auth,studentControllers.getFeeStatus)

module.exports = router;
