var express = require("express");
const isAuthenticated = require("./authMiddleware");
var router = express.Router();
const multer = require('multer')

const db = require("../db/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });

router.post('/upload', isAuthenticated,upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename, path } = req.file;

  const insertImageQuery = 'INSERT INTO images (name, path, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)';
  db.query(insertImageQuery, [filename, path], (err, result) => {
    if (err) {
      console.error('Error inserting image:', err);
      return res.status(500).json({ error: 'Error uploading image' });
    }
    res.status(200).json({ message: 'Image uploaded successfully', filename });
  });
});


module.exports = router;
