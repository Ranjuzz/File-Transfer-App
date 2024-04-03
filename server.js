const express = require("express");
require("dotenv").config();
const path = require('path');
const multer = require("multer");
const mongoose = require("mongoose");
const Files = require("./models/File");
// const fs = require("fs")

const upload = multer({ dest: "uploads" });

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalname: req.file.originalname,
    };
    console.log(req.file);
    const file = await Files.create(fileData);
    res.render("index", { fileLink: `${process.env.APP_BASE_URL}/${file.id}` });
});

app.route("/:id")
    .get(handleDownload)
    .post(handleDownload);

// Function to handle file download
async function handleDownload(req, res) {
    try {
        const file = await Files.findById(req.params.id);
        file.downloadCount++;
        await file.save();
        console.log(file);
        res.download(file.path, file.originalname);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading the file");
    }
}

// Server Setup
const port = process.env.PORT || 3000; // Fallback to port 3000 if PORT env variable is not provided
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
