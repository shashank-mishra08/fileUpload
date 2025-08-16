// routes me sabse pehle hame express ko import krna hai

const express = require("express");
const router = express.Router();

// fir apan saare ke saare handlers function laate hain apne controllers  me se
const {  localFileUpload, imageUpload, videoUpload, imageSizeReducer } = require("../controllers/fileUpload");

// fir hame in handlers ko routes se connect krna hota hai, so we will create 4 api routes for each handler function
//router.post("/image", imageUpload);
router.post("/local", localFileUpload);
router.post("/imageUpload", imageUpload)
router.post("/video", videoUpload);  
router.post("/imagereducer", imageSizeReducer); 

// finally, we will export the router
module.exports = router;
// ab hamare routes ready hai, ab hamare index.js me in routes ko mount krna hai--> jo ki hamne already mount kr diya hai