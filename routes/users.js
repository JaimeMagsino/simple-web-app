var express = require("express");
var router = express.Router();
const db = require("../db/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "Error hashing password" });
      return;
    }

    const insertUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, hash];

    db.query(insertUserQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Error inserting user" });
        return;
      }

      console.log("User inserted successfully");
      res.status(201).json({
        message: "User inserted successfully",
        userId: result.insertId,
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const selectUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(selectUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error selecting user:", err);
      res.status(500).json({ error: "Error selecting user" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        res.status(500).json({ error: "Error comparing passwords" });
        return;
      }

      if (!passwordMatch) {
        res.status(401).json({ error: "Incorrect password" });
        return;
      }
      req.session.isLoggedIn=true;
      if (req.session.isLoggedIn) res.redirect("/image");
    });
  });
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
