# Simple Web Application

Welcome to the Simple Web Application! This application utilizes a MySQL database to manage user login and registration. It employs simple authorization using `express-session`, allowing only logged-in users to upload files.

## Features

- User Authentication: Users can register and log in securely using their credentials.
- Authorization: Only authenticated users have permission to upload files.
- File Upload: Authenticated users can upload files to the application.

## Technologies Used

- Node.js
- Express.js
- MySQL
- `express-session`
- HTML
- CSS

## Note
The server for the database used is xampp.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   $ git clone (https://github.com/deepkuma123/simple-web-app.git)

2. Install the dependences   
   ```bash
    $ npm install

3. Start the server
    ```bash
   $ npm start
4. need to create create the database name same as the name used in this code inside the db folder 
  ```javascript
  
const connection = mysql.createConnection({
  host: "your-hostname", // Replace "your-hostname" with your MySQL server hostname
  user: "your-username", // Replace "your-username" with your MySQL username
  password: "your-password", // Replace "your-password" with your MySQL password
  database: "your-database", // Replace "your-database" with your MySQL database name
});


## Contact
 `(https://github.com/deepkuma123/simple-web-app.git)` and `deepkuma3214@gmail.com`