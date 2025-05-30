const mysql = require('mysql2');  // Import mysql2 package
const bcrypt = require('bcrypt');
require('dotenv').config();  // Load environment variables from .env file

// Create a connection to the MySQL database using the connection details from .env
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect to MySQL
const connectDB = () => {
  connection.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
      process.exit(1);  // Exit if the connection fails
    } else {
      console.log('MySQL connected successfully');
    }
  });
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(new Error('Error querying the database: ' + err.message));

      if (results.length === 0) return reject(new Error('User not found'));

      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return reject(new Error('Error comparing passwords: ' + err.message));
        if (match) resolve(user);  // Return user details if password matches
        else reject(new Error('Invalid password'));
      });
    });
  });
};

const addUser = async (email, password, fullName, age, idNumber, phone) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return reject(new Error("Error hashing the password: " + err.message));

      const query = `
        INSERT INTO users (email, password, fullName, age, idNumber, phone) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      connection.query(query, [email, hashedPassword, fullName, age, idNumber, phone], (err, results) => {
        if (err) return reject(new Error("Error adding user to the database: " + err.message));

        resolve({
          email,
          fullName,
          age,
          idNumber,
          phone,
          id: results.insertId,
          message: "User created successfully",
        });
      });
    });
  });
};

// Function to delete a user by their email ID
const deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(new Error('Error deleting user: ' + err.message));
      if (results.affectedRows === 0) return reject(new Error('User not found'));

      resolve({ message: 'User deleted successfully' });
    });
  });
};

// ✅ Function to modify password
const modifyPassword = async (email, oldPassword, newPassword) => {
  try {
    // Authenticate user with current password
    await authenticateUser(email, oldPassword);

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    return new Promise((resolve, reject) => {
      // Update the password in the database
      connection.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedNewPassword, email],
        (err, results) => {
          if (err) return reject(new Error('Error updating password: ' + err.message));
          if (results.affectedRows === 0) return reject(new Error('User not found'));

          resolve({ message: 'Password updated successfully' });
        }
      );
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Function to update Full Name and Phone Number
const updateUserDetails = async (email, newFullName, newPhone) => {
  return new Promise((resolve, reject) => {
    // Check if the user exists before updating
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(new Error('Error querying the database: ' + err.message));
      if (results.length === 0) return reject(new Error('User not found'));

      // Proceed with updating the user details
      connection.query(
        'UPDATE users SET fullName = ?, phone = ? WHERE email = ?',
        [newFullName, newPhone, email],
        (err, updateResults) => {
          if (err) return reject(new Error('Error updating user details: ' + err.message));
          if (updateResults.affectedRows === 0) return reject(new Error('User update failed'));

          resolve({ message: 'User details updated successfully' });
        }
      );
    });
  });
};

module.exports = { connection, connectDB, authenticateUser, addUser, deleteUser, modifyPassword, updateUserDetails };
