# **File Sharing Web Application**
_**A simple file sharing web application built with Node.js, Express, MongoDB, and Multer.**_

## **Table of Contents**

+ Features
+ Installation
+ Usage
+ Dependencies
+ Contributing
+ License
    
## **Features**
**File Upload:** 
Upload files to the server.
    
**File Download:**
Download uploaded files using a unique link.
    
**Download Count:**
Keep track of the number of times each file is downloaded.
    
**Responsive Design:** 
Designed to work well on both desktop and mobile devices.


## **Installation:**
### Clone the repository:
```git
git clone https://github.com/your-username/your-repository.git
```
### Install dependencies:
```
cd your-repository
npm install
```

### Set up environment variables:

Create a .env file in the root directory and define the following variables:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-database
APP_BASE_URL=http://localhost:3000
```
### Start the server:
```
npm start
```

## **Usage**

  Access the application in your web browser at ```http://localhost:3000```. Upload files using the file upload form. Share the provided link with others to allow them to download the uploaded file.Each time a file is downloaded, the download count will be incremented.

## **Dependencies**
**Express:** Fast, unopinionated, minimalist web framework for Node.js.

**Mongoose:** MongoDB object modeling for Node.js.

**Multer:** Middleware for handling multipart/form-data, primarily used for file uploads.

**dotenv:** Loads environment variables from a .env file into process.env.

## **Contributing**
Contributions are welcome! Feel free to open an issue or submit a pull request.
:)
