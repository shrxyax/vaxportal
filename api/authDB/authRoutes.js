const express = require('express');
const bcrypt = require('bcrypt');
const { 
  authenticateUser, 
  deleteUser, 
  addUser, 
  modifyPassword, 
  updateUserDetails,  // ✅ Import the new function
  connectDB 
} = require('./mysql'); // Import functions

const router = express.Router();

connectDB();

// ✅ Route: User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// ✅ Route: Register a New User
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, age, idNumber, phone } = req.body;

    if (!email || !password || !fullName || !age || !idNumber || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUser = await addUser(email, password, fullName, age, idNumber, phone);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Route: Delete a User (by email)
router.delete('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await deleteUser(email);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Route: Modify Password
router.put('/user/password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Email, old password, and new password are required." });
    }

    await modifyPassword(email, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Route: Update Full Name and Phone Number
router.put('/user/update', async (req, res) => {
  try {
    const { email, newFullName, newPhone } = req.body;

    if (!email || !newFullName || !newPhone) {
      return res.status(400).json({ message: "Email, new full name, and new phone number are required." });
    }

    await updateUserDetails(email, newFullName, newPhone);
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
