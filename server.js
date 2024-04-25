import express from "express";
import { config } from "dotenv";
import path from 'path';
import multer from "multer";
import { connect } from "mongoose";
import File from "./models/File.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Load environment variables
config();
// console.log(path.dirname)
const upload = multer({ dest: './uploads' });

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.set('views',  './views');
app.set("view engine", "ejs");
app.use(express.static('./public'));

// Database Connection
connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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
    const file = await File.create(fileData);
    res.render("index", { fileLink: `${process.env.APP_BASE_URL}/${file.id}` });
});

app.route("/:id")
    .get(handleDownload)
    .post(handleDownload);

// Function to handle file download
async function handleDownload(req, res) {
    try {
        const file = await findById(req.params.id);
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
