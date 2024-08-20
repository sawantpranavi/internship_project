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

// Remove the duplicate declaration of login function
    const login = async (req, res) => {
        try {
            console.log('Received login data:', req.body); // Log the received data
    
            const { email, password } = req.body;
    
            // Check if the user exists
            const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
    
            const user = rows[0];
    
            // Compare the password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
    
            // Optionally, you can create a JWT token and send it to the client
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    
            // Send success response and optionally redirect
            res.status(200).json({
                message: 'Login successful',
                token, // Optional: Send token for authentication
            });
    
            // Redirect the user to /imanage (Client-side redirection is usually handled in frontend)
            res.redirect('/imanage'); // This might not work in some setups
        } catch (error) {
            console.error('Error during login:', error); // Log the error
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
