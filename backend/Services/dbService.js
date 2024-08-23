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

const createcart = async (userid, productid, vendor, quantity) => {
    const connection = await pool.getConnection();
    console.log("here");
    try {
        const [rows] = await connection.query(
            'INSERT INTO cart (userid, productid, quantity, vendor) VALUES (?, ?, ?, ?)',
            [userid, productid, quantity, vendor]
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
const findprodid = async (name) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT id FROM product WHERE model = ?',
            [name]
        );
        return rows[0]; // Return the first row if found, otherwise undefined
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        connection.release();
    }
} 

const getCartData = async (userId) => {
   const connection = await pool.getConnection();
    try {
         const [rows] = await connection.query(
              'SELECT * FROM cart WHERE userid = ?',
              [userId]
         );
         return rows;
    } catch (error) {
         console.error('Database error:', error);
         throw error;
    } finally {
         connection.release();
    }
}

const getOrderData = async (userId)=>{
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
             'SELECT * FROM order WHERE userid = ?',
             [userId]
        );
        return rows;
   } catch (error) {
        console.error('Database error:', error);
        throw error;
   } finally {
        connection.release();
   }
}
module.exports = {
    createUser,
    findUserByEmail,
    createcart,
    findprodid,
    getCartData,
    getOrderData
};
