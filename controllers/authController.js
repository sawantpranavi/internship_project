const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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
        res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    register
};
