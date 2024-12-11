// 1. Package Imports and config
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: "../../.env" });
const router = express.Router();
const { verifyToken, checkRole } = require('../middleWare/authMiddleWare.js');
const User = require("../models/userModel.js");


// 2. User Registration Route
router.post('/register', async (req, res) => {
  
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      userId: `USER_${Date.now()}`, 
      username,
      email,
      passwordHash,
      role: role || 'user',
      isActive: true
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: newUser.userId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration error', error: error.message });
  }
});

// 3. Utility route get all users
router.get('/getusers',async(req,res)=>{
  const users = await User.find();
  res.json(users);
})

// 4. Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is not active' });
    }

    console.log('User role before sending response:', user.role);

    // Generate JWT and sign it
    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      }, 
      "secretkey123", 
      { expiresIn: '1h' }
    );
    
     console.log('Generated token:', token);
     console.log('User object being sent:', {
       id: user._id, 
       username: user.username, 
       role: user.role
     });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});


module.exports = router;
