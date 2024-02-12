var express = require('express');
const isAuthenticated = require('./authMiddleware');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/image', function(req, res, next) {
  res.render('image');
});

router.get('/hello', isAuthenticated, (req, res) => {
      res.status(200).json({ message: "You are logged in" });
})
module.exports = router;
