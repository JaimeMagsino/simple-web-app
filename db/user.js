// db.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simple-web-app",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");

  // Create the users table if it doesn't exist
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 
  `;
  connection.query(createUserTableQuery,(err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table created successfully");
  });
  
  const createImageTableQuery = `
  CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;
  connection.query(createImageTableQuery, (err) => {
    if (err) {
      console.error("Error creating images table:", err);
      return;
    }
    console.log("Images table created successfully");
  });
});



module.exports = connection;
