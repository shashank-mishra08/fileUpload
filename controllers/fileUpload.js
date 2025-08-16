const { response } = require('express');
const File = require('../models/File');
const cloudinary = require("cloudinary").v2

// ab hame apne localfileUpload ka handler function create krna hai 
// ye sever ke andar sirf ek location pe upload krega    
exports.localFileUpload = async (req, res) => {
    try {
        // Fetch file, file fetch from request
        const file = req.files.file;
        console.log("FULL FILE OBJECT -> ", req.files);
        console.log("FILE AAGYI JEE -> ", file);

        // Preserve file extension, create path where file need to be stored on server
        // __dirname gives the path of the current directory, Date.now() is used to give a unique name to each file, and the file extension is extracted from the original file name.
        let path = __dirname + "/files/" + Date.now() +`.${file.name.split('.').pop()}` ; // jo v meri file ki name hai usko split kar do on the basis of dot and 1st index pe jo padi hai wo nikal lo
        console.log("PATH -> ", path);

        // Move file to the target directory, add path to the move function
        file.mv(path, (err) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: "File upload failed", 
                    error: err
                 });
            }
            // create a successfull response 
            res.json({
                success: true,
                message: 'Local File Uploaded Successfully',
                filePath: path
            });
        });

    } catch (error) {
        console.log(error);  
        res.status(500).json({ success: false, message: "Internal Server Error aa gaya shashank ", error: error.message });
    }
};




// image upload ka handler
// jo v request hai usme sabse pehle data fetch kar lo
// ab file v recive karni hai, file kis path se recive karta hoon using req.files.usfilekanaam   -> file recieve kar skte 
// validation karni hai, and current jis file pe kaam kar raha hoon uska type kaise pta lagega => file ke name ke upar split function use karke
// kya filetype, supportedFile se match kar raha ya nahi nahi uske liye function, agr nai match kara to response me not supported and kar gaya to 
// supported hai to cloudinary pe upload krna hoga, by using upload function of cloudinary 
// iske baad apan db me entry save karenge

    // Function to check if the file type is supported
function isFileTypeSupported(type, supportedTypes) {
    // It checks if the given file type is present in the array of supported types.
    return supportedTypes.includes(type); // Returns true if the file type is in the supported list
}

// Function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder,quality) {
    // Creates an options object to specify the folder where the file will be stored in Cloudinary.
    const options = {folder};
    console.log("temp file path",file.tempFilePath) // hamre file ka ye temporary path hai, ye wo path hai jo aapke server ke upar temperory folder bnta hai
    // jab v aap kisi media server pe upload krne ka kosis krte hain to aapke local machine se data uth ke jaata h server pe kisi temporary folder me upload hota hai fir sever se uth ke media server pe jaata and us server se aapka data delete ho jaata from that temporary folder
    // Uploads the file to Cloudinary using its temporary file path
    if(quality){
        // If a quality is specified, it is added to the options object.
        options.quality =quality;
    }
   // The `cloudinary.uploader.upload` method is used to upload the file to Cloudinary.
   return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image upload handler function
exports.imageUpload = async (req, res) => {
    try {
        // 1. Extracting data from request body
        // The name, tags, and email are extracted from the request body.
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // 2. Extracting the uploaded file from request
        // The uploaded file is extracted from the request using `req.files.imageFile`.
        const file = req.files.imageFile;
        // If no file is provided, return an error
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded."
            });
        }
        console.log(file);

        // 3. File type validation
        // An array of supported file types is defined.
        const supportedTypes = ["jpg", "jpeg", "png"]; // Allowed file types
        // The file extension is extracted from the file name.
        const fileType = file.name.split('.').pop().toLowerCase(); // Extracting file extension
        console.log("file type", fileType);   
        // 4. Checking if file type is supported
        // The `isFileTypeSupported` function is called to check if the file type is supported.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // 5. If the file format is supported, proceed with the upload process
        // The `uploadFileToCloudinary` function is called to upload the file to Cloudinary.
        const uploadResponse = await uploadFileToCloudinary(file, "shashank",30); // FIX: Store in a variable
        const imageUrl = uploadResponse.secure_url; // FIX: Use the correct variable 

        // 6. ab apne ko db me entry save krni hai
        // A new document is created in the `File` collection with the file details.
        const fileData =  await File.create({
            name, tags, email, imageUrl:  uploadResponse.secure_url,
        })
         
        // A success response is sent with the URL of the uploaded image.
        res.json({success:"true", message: "image successfully uploaded", imageUrl:uploadResponse.secure_url,}) 


     
 
    } catch (error) {
        console.error("Error in image upload:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};






// video upload ka handler likhna hai ab




// Function to upload video to Cloudinary
async function uploadVideoToCloudinary(file, folder) {
    // Creates an options object to specify the resource type as video and the folder where the file will be stored in Cloudinary.
    const options = {
        resource_type: "video", // Important: Specify it's a video
        folder: folder
    };
    console.log("Uploading video from temp path:", file.tempFilePath);
    // The `cloudinary.uploader.upload` method is used to upload the video to Cloudinary.
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Video upload handler function
exports.videoUpload = async (req, res) => {
    try {
        // 1. Extracting data from request body
        // The name, tags, and email are extracted from the request body.
        const { name, tags, email } = req.body;
        console.log("Received Data:", name, tags, email);

        // 2. Extracting the uploaded file from request
        // The uploaded file is extracted from the request using `req.files.videoFile`.
        const file = req.files.videoFile; // Ensure your frontend sends "videoFile"
        console.log("Received File:", file);

        // 3. File type validation
        // An array of supported file types is defined.
        const supportedTypes = ["mp4", "mov", "avi", "mkv"]; // Allowed video types
        // The file extension is extracted from the file name.
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type:", fileType);

        // 4. Checking if file type is supported, add upper limit of 5mb for video
        // The `isFileTypeSupported` function is called to check if the file type is supported.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "Video format not supported"
            });
        }

        // 5. Upload video to Cloudinary
        // The `uploadVideoToCloudinary` function is called to upload the video to Cloudinary.
        const uploadResponse = await uploadVideoToCloudinary(file, "shashank"); 
        // The secure URL of the uploaded video is extracted from the response.
        const videoUrl = uploadResponse.secure_url;

        // 6. Save entry in database
        // A new document is created in the `File` collection with the file details.
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl // Save the Cloudinary URL
        });

        // A success response is sent with the file data.
        res.json({ success: true, message: "Video successfully uploaded", fileData });

    } catch (error) {
        console.error("Error in video upload:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error for video upload",
            error: error.message
        });
    }
};






// ab image reducer ka handler function likhna hai

exports.imageSizeReducer = async (req, res) => {
    try {
        // Data fetch
        // The name, tags, and email are extracted from the request body.
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // The uploaded file is extracted from the request using `req.files.imageFile`.
        const file = req.files.imageFile;
        // If no file is provided, return an error
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded."
            });
        }
        console.log(file);

        // Validation
        // An array of supported file types is defined.
        const supportedTypes = ["jpg", "jpeg", "png"];
        // The file extension is extracted from the file name.
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type:", fileType);

        // The `isFileTypeSupported` function is called to check if the file type is supported.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // File format supported
        console.log("Uploading to Codehelp");
        // The `uploadFileToCloudinary` function is called to upload the file to Cloudinary with a quality of 30.
        const response = await uploadFileToCloudinary(file, "shashank", 30  );
        console.log(response);

        // DB entry save
        // A new document is created in the `File` collection with the file details.
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // A success response is sent with the URL of the uploaded image.
        res.json({
            success: true,
            message: "Image successfully uploaded",
            imageUrl: response.secure_url,
        });

    } catch (error) {
        console.error("Error in image upload:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}; 