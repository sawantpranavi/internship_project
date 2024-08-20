const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Function to create a user
const createUser = async (fullName, userName, email, address, password, designation, department) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'INSERT INTO users (full_name, user_name, email, address, password, designation, department) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [fullName, userName, email, address, password, designation, department]
        );
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0]; // Return the first row if found, otherwise undefined
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    createUser,
    findUserByEmail
};
