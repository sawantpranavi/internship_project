require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Register User
app.post('/register', (req, res) => {
    const { full_name, username, email, address, designation, department, division, sub_division, state, taluka, constituency, password } = req.body;

    // Hash the password before saving it to the database
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const user = { full_name, username, email, address, designation, department, division, sub_division, state, taluka, constituency, password: hash };

        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) {
                return res.status(400).json({ message: 'User registration failed', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login User
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        // Compare the entered password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                // Generate a JWT token
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.json({ message: 'Login successful', token });
            } else {
                return res.status(400).json({ message: 'Invalid password' });
            }
        });
    });
});

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
