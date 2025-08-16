// Import the Express framework
const express = require("express");
// Create an instance of the Express application
const app = express();

// Load environment variables from the .env file
require("dotenv").config();
// Set the port number for the server
const PORT = process.env.PORT || 3000;

// Enable the Express application to parse JSON-formatted request bodies
app.use(express.json());
// Import the express-fileupload middleware for handling file uploads
const fileupload = require("express-fileupload");
// Enable the express-fileupload middleware
app.use(fileupload( 
  {useTempFiles: true, tempFileDir: '/tmp/'}
)); // Helps in file upload

// Import the database connection function
const db = require("./config/database");
// Connect to the database
db();

// Import the Cloudinary configuration function
const cloudinary = require("./config/cloudinary");
// Connect to Cloudinary
cloudinary.cloudinaryConnect();

// Import the file upload routes
const Upload = require("./routes/FileUpload");
// Mount the file upload routes at the /api/v1/upload endpoint
app.use('/api/v1/upload', Upload);

// Default route to serve the HTML frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})