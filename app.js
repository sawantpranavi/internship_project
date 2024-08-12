const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" }); // This is to hide the database credentials from the codebase. The credentials are stored in the .env file instead

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, "../imanage");
app.use(express.static(publicDirectory));

// app.set("view engine", "html");

db.connect((err) => {
    if (err) {
        console.log (err);
    }
    console.log("Connected to database");
});

app.get("/", (req, res) => {
    // res.send("Hello World");
    res.render("index");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})