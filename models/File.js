// Import the Mongoose library
const mongoose = require('mongoose');
// Import the Nodemailer library
const nodemailer = require("nodemailer");         

// Define the file schema
const fileSchema = new mongoose.Schema({
    // The name of the file
    name:{
        type: String,
        required: true,

    },
    // The URL of the uploaded image
    imageUrl:{
        type: String,
    },
    // The URL of the uploaded video
    videoUrl:{
        type: String,
    },
    // An array of tags associated with the file
    tags:{
        type: [String],
    },
    // The email of the user who uploaded the file
    email:{
        type: String,
    }
});

    //post middleware
// This function is executed after a new document is saved to the database
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc);

        //transporter 
        // A Nodemailer transporter is created to send emails
        let transporter = nodemailer.createTransport({  
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        // send mail
        // An email is sent to the user with a link to the uploaded file
        let info = await transporter.sendMail({
            from:"shashank",
            to: doc.email,
            subject: "new file uploaded on cloudniary",
            html: `<h>hello bhai</h> <p>file uploaded successfully</p> view here: <a href="${doc.imageUrl}">${doc.imageUrl} </a> ` , 
        })
        console.log("info", info)

    } catch(error) {
        console.error(error);
    }
});




// Create the File model from the schema
const File = mongoose.model("File",fileSchema); // file naam ka hamne ek model create kr liya hai
// Export the File model
module.exports = File;
