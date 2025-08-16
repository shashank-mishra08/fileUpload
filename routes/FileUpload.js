// Import the Express framework
const express = require("express");
// Create a new router object
const router = express.Router();

// Import the file upload handlers from the controller
const {  localFileUpload, imageUpload, videoUpload, imageSizeReducer } = require("../controllers/fileUpload");

// Define the API routes for file uploads
// This route handles local file uploads
router.post("/localFileUpload", localFileUpload);
// This route handles image uploads
router.post("/imageUpload", imageUpload)
// This route handles video uploads
router.post("/videoUpload", videoUpload);  
// This route handles image size reduction
router.post("/imageSizeReducer", imageSizeReducer); 

// Export the router
module.exports = router;