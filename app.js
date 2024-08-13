require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
























// const express = require("express");
// const path = require("path");
// const mysql = require("mysql");
// const dotenv = require("dotenv");

// dotenv.config({ path: "./.env" }); // This is to hide the database credentials from the codebase. The credentials are stored in the .env file instead

// const app = express();

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

// const publicDirectory = path.join(__dirname, "../imanage");
// app.use(express.static(publicDirectory));

// // app.set("view engine", "html");

// db.connect((err) => {
//     if (err) {
//         console.log (err);
//     }
//     console.log("Connected to database");
// });

// app.get("/", (req, res) => {
//     // res.send("Hello World");
//     res.render("index");
// });

// app.get("/index", (req, res) => {
//     res.render("index");
// });

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// })