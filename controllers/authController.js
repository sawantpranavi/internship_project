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
        console.log('Received login data:', req.body);  // Log the received data
    } catch (error) {
        console.error('Error during registration:', error);  // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { register, login };



// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');

// const register = async (req, res) => {
//     try {
//         const { fullName, userName, email, address, password, designation, department } = req.body;

//         if (!fullName || !userName || !email || !address || !password || !designation || !department) {
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the user
//         const result = await User.createUser(fullName, userName, email, address, hashedPassword, designation, department);
//         res.status(201).json({ message: 'User registered successfully', result });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = {
//     register
// };
