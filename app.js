// Importing essential libraries
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const videoStorage = multer.diskStorage({
  destination: "videos", 
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000, // 100 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});
app.post(
  "/uploadVideo",
  videoUpload.single("video"),
  (req, res) => {
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
app.listen(port);
console.log(`Server started at http://localhost:${port}`);
