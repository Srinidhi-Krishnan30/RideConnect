// 1. Imports and config
const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const User = require('../models/userModel');  

// 2. Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// 3 .Add  a new user
router.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const userId = uuidv4(); 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId: userId,
      username: username,        
      passwordHash: hashedPassword,  
      role: role,
      email: email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});


// 4. Update user information
router.put('/', async (req, res) => {
  const { username, newRole } = req.body;
  try {
    
    const user = await User.findOne({ username });  // Find user by username
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;  // Update the user's role
    await user.save();

    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error changing user role', error });
  }
});


// 5. Delete a user by username
router.delete('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});



// 6. Change user role 
router.put('/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;  // Update the user's role
    await user.save();
    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error changing user role', error });
  }
});

module.exports = router;
