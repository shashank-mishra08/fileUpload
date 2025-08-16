# File Upload API

This is a simple file upload API built with Node.js, Express, and MongoDB. It allows users to upload files to a server, which are then uploaded to Cloudinary for cloud storage. The API also saves file metadata to a MongoDB database.

## Features

*   Upload files to the server.
*   Upload files to Cloudinary.
*   Save file metadata to a MongoDB database.
*   Send an email with a link to the uploaded file.

## Technologies Used

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
*   **MongoDB:** A cross-platform document-oriented database program.
*   **Mongoose:** A MongoDB object modeling tool designed to work in an asynchronous environment.
*   **Cloudinary:** A cloud-based image and video management platform.
*   **Nodemailer:** A module for Node.js applications to allow easy as cake email sending.
*   **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
*   **express-fileupload:** A simple express middleware for uploading files.

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=3000
    MONGODB_URL=<your-mongodb-url>
    CLOUD_NAME=<your-cloudinary-cloud-name>
    API_KEY=<your-cloudinary-api-key>
    API_SECRET=<your-cloudinary-api-secret>
    MAIL_HOST=<your-mail-host>
    MAIL_USER=<your-mail-user>
    MAIL_PASS=<your-mail-pass>
    ```
4.  Start the server:
    ```bash
    npm start
    ```

## API Endpoints

The following API endpoints are available:

*   `POST /api/v1/upload/localFileUpload`: Uploads a file to the local server.
*   `POST /api/v1/upload/imageUpload`: Uploads an image to Cloudinary.
*   `POST /api/v1/upload/videoUpload`: Uploads a video to Cloudinary.
*   `POST /api/v1/upload/imageSizeReducer`: Uploads an image to Cloudinary and reduces its size.

## Project Structure

```
.
├── config
│   ├── cloudinary.js
│   └── database.js
├── controllers
│   └── fileUpload.js
├── models
│   └── File.js
├── node_modules
├── routes
│   └── FileUpload.js
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
