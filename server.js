
const express = require("express")
require("dotenv").config()
const req = require("express/lib/request")
const path = require('path');
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Files = require("./models/File")

// const upload = multer({dest : "uploads"})

const app = express()
app.use(express.urlencoded({ extended: true}))
app.set('views',path.join(__dirname,'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DATABASE_URL)

count = 1
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,count++ + "-"+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })

app.get("/",(req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), async (req, res) => {
    
    const fileData = {
        path: req.file.path,
        orginalname: req.file.originalname
    }
    console.log(req.file);
    const file = await Files.create(fileData)
    res.render("index", { fileLink: `${process.env.APP_BASE_URL}/${file.id}` })
    
})

app.route("/:id").get(HandleDownload).post(HandleDownload)

async function HandleDownload (req,res) {
    const f = await Files.findById(req.params.id)
    f.downloadCount++
    await f.save()
    console.log(f)
    res.download(f.path, f.orginalname)
}
app.listen(process.env.PORT)