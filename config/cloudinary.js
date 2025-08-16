// Import the Cloudinary library
const cloudinary = require('cloudinary').v2;
// Load environment variables from the .env file
require('dotenv').config();

// Define a function to connect to Cloudinary
exports.cloudinaryConnect = () => {
    try {
        // Configure the Cloudinary SDK with the credentials from the environment variables
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        // Log a success message if the connection is successful
        console.log("✅ Cloudinary connected successfully");
    }
    catch (error) {
        // Log an error message if the connection fails
        console.error("❌ Cloudinary connection failed:", error);
        // Exit the process with a non-zero status code to indicate an error
        process.exit(1); // Stop the server if Cloudinary connection fails
    }
}