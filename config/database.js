// Import the Mongoose library
const mongoose = require("mongoose");
// Load environment variables from the .env file
require("dotenv").config(); // Load environment variables

// Define a function to connect to the database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the URL from the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // Log a success message if the connection is successful
    console.log("✅ Database connected successfully");
  } catch (error) {
    // Log an error message if the connection fails
    console.error("❌ Database connection failed:", error);
    // Exit the process with a non-zero status code to indicate an error
    process.exit(1); // Stop the server if DB connection fails
  }
};

// Export the database connection function
module.exports = connectDB;

   