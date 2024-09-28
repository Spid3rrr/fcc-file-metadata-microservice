// create express app and serve home.html

const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.post("/api/fileanalyse",upload.single('upfile'), (req, res) => {
    if (!req.file) {
        return res.json({ error: "No file uploaded" });
      }
      res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
