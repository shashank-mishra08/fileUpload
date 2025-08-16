// 

// Import dependencies
const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(fileUpload( 
  {useTempFiles: true, tempFileDir: '/tmp/'}
)); // Helps in file upload

// Import routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload); // Mount the upload route

// Connect to MongoDB (after middleware)
const connectDB = require("./config/database");
connectDB();

// Connect to Cloudinary
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the MongoDB connection setup!");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});