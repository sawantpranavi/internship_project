const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.authToken;

        // If no token is present, return an error
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Unauthorized: Invalid token' });
            }

            // Save the decoded user data to the request object
            req.user = decoded;

            // Continue to the next middleware/route handler
            next();
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = authenticateToken;
