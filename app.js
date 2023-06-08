// Install required packages: express, bcrypt, and mysql

// server.js
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database_name",
});

// Establish the database connection
connection.connect();

// Middleware to parse incoming request body
app.use(express.urlencoded({ extended: true }));

// User registration route
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user details into the database
  const query =
    "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
  connection.query(
    query,
    [username, hashedPassword, email],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error registering user");
      } else {
        res.send("User registered successfully");
      }
    }
  );
});

// User login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user details from the database
  const query = "SELECT * FROM Users WHERE username = ?";
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error logging in");
    } else if (results.length === 0) {
      res.status(401).send("Invalid username");
    } else {
      const user = results[0];

      // Compare the entered password with the hashed password
      if (bcrypt.compareSync(password, user.password)) {
        res.send("Login successful");
      } else {
        res.status(401).send("Invalid password");
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
