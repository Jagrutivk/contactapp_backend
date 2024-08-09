const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Path to the JSON file
const dataFilePath = path.join(__dirname, "users.json");

// Function to read the file and parse the data
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
};

// Function to write data to the file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Routes

// Get all users
app.get("/api/users", (req, res) => {
  const users = readData();
  res.json(users);
});

// Create a new user
app.post("/api/users", (req, res) => {
  const users = readData();
  const newUser = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    gender: req.body.gender,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    streetAddress1: req.body.streetAddress1,
    streetAddress2: req.body.streetAddress2,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    socialMediaLink: req.body.socialMediaLink,
    work: req.body.work,
  };
  users.push(newUser);
  writeData(users); // Save the updated data back to the file
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
