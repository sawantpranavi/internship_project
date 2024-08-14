const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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

module.exports = {
    createUser
};