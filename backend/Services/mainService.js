const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Services/dbService');

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// Register function
const register = async (req, res) => {
    try {
        const { fullName, userName, email, address, password, designation, department } = req.body;

        if (!fullName || !userName || !email || !address || !password || !designation || !department) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const result = await User.createUser(fullName, userName, email, address, hashedPassword, designation, department);

        // Generate JWT token
        const token = jwt.sign({ id: result.id, email: result.email }, secretKey, { expiresIn: '1h' });

        // Set token in a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Set token in a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login };

const addtocart = async (req, res) => {
    try {
        const { vendor, quantity, name } = req.body;
        console.log(req.body);
        const userId = req.user.id;  // The ID of the authenticated user
        const productid = await User.findprodid(name);

        const result = await User.createcart(userId, productid.id, vendor, quantity);

        res.status(200).json({ message: 'Product added to cart successfully' });

    } catch (error) {
        console.error('Error during adding to cart:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login, addtocart };