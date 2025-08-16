const mongoose = require('mongoose');
const nodemailer = require("nodemailer");         
const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    imageUrl:{
        type: String,
    },
    tags:{
        type: [String],
    },
    email:{
        type: String,
    }
});

    //post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc);

        //transporter 
        let transporter = nodemailer.createTransport({  
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        // send mail
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




const File = mongoose.model("File",fileSchema); // file naam ka hamne ek model create kr liya hai
module.exports = File;
