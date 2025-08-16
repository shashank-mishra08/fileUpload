# File Upload API

This is a simple file upload API built with Node.js, Express, and MongoDB. It allows users to upload files to a server, which are then uploaded to Cloudinary for cloud storage. The API also saves file metadata to a MongoDB database and sends an email notification to the user with a link to the uploaded file.

## Big Picture

The application is a RESTful API that provides endpoints for uploading files. It is built with a layered architecture, with separate layers for routing, controllers, and models. This separation of concerns makes the application more modular, maintainable, and scalable.

The application uses the following technologies:

*   **Node.js and Express:** For building the RESTful API.
*   **MongoDB and Mongoose:** For storing file metadata.
*   **Cloudinary:** For storing the uploaded files.
*   **Nodemailer:** For sending email notifications.

When a user uploads a file, the following steps are performed:

1.  The file is received by the server.
2.  The file is uploaded to Cloudinary.
3.  A new document is created in the `File` collection in the MongoDB database with the file details.
4.  An email is sent to the user with a link to the uploaded file.

## Features

*   Upload files to the local server.
*   Upload images and videos to Cloudinary.
*   Reduce the size of uploaded images.
*   Save file metadata to a MongoDB database.
*   Send an email notification to the user with a link to the uploaded file.

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

## Code Explanation

### `index.js`

This is the main entry point of the application. It imports the necessary dependencies, connects to the database and Cloudinary, and starts the server.

### `config/cloudinary.js`

This file exports a function that connects to the Cloudinary service using the credentials from the environment variables.

### `config/database.js`

This file exports a function that connects to the MongoDB database using the URL from the environment variables.

### `controllers/fileUpload.js`

This file contains the handler functions for the file upload routes. These functions handle the logic for uploading files to the local server and Cloudinary, and for saving file metadata to the database.

### `models/File.js`

This file defines the Mongoose schema for the `File` collection. It also defines a post-save middleware function that sends an email notification to the user after a new file is uploaded.

### `routes/FileUpload.js`

This file defines the API routes for file uploads. It maps the routes to the corresponding handler functions in the `fileUpload.js` controller.
