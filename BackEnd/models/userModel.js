// 11. Schema to hold user information
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,  
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,  
    trim: true,   
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  email: {
    type: String,
    unique: true,  
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],  // email vaidation
  },
  isActive: {
    type: Boolean,
    default: true,  
  },
}, {
  timestamps: true,  
});


module.exports = mongoose.model('User', userSchema);

