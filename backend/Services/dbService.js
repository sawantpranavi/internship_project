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

const createcart = async (name, userid, productid, vendor, quantity,  price) => {
    const connection = await pool.getConnection();
    console.log("here");
    try {
        const [rows] = await connection.query(
            'INSERT INTO cart (userid, name, productid, unitPrice, quantity, vendor) VALUES (?, ?, ?, ?, ?, ?)',
            [userid,name, productid,price,  quantity, vendor]
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
const findprodid = async (name, cat) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT id, price  FROM product WHERE model = ? AND category = ?',
            [name, cat]
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
              'SELECT * FROM cart WHERE userid = ? AND bought=0',
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
             'SELECT * FROM cart WHERE userid = ? AND bought=1',
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
const confirmOrder = async (userId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
             'UPDATE cart SET bought=1, orderDate=CURDATE() WHERE userid = ?',
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
    getOrderData,
    confirmOrder
};
