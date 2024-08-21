const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const register = async (req, res) => {
    try {
        console.log('Received registration data:', req.body);  // Log the received data
        const { fullName, userName, email, address, password, designation, department } = req.body;

        if (!fullName || !userName || !email || !address || !password || !designation || !department) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const result = await User.createUser(fullName, userName, email, address, hashedPassword, designation, department);
        console.log('User registration successful:', result);  // Log success
        res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
        console.error('Error during registration:', error);  // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const login = async (req, res) => {
    try {
        console.log('Received login data:', req.body); // Log the received data

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email using the User model
        const user = await User.findUserByEmail( email );

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send success response with token
        res.status(200).json({
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addtocart = async (req, res) => {
    try {
        console.log('Received cart data:', req.body); // Log the received data

        // const { product, quantity } = req.body;

        // if (!product || !quantity) {
        //     return res.status(400).json({ message: 'Product and quantity are required.' });
        // }

        // // Find the user by email using the User model
        // const user = await User.findUserByEmail( email );

        // if (!user) {
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }

        // // Compare the password with the hashed password in the database
        // const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }

        // // Send success response with token
        // res.status(200).json({
        //     message: 'Login successful',
        // });

    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
module.exports = { register, login, addtocart };


