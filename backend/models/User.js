// models/User.js
const mongoose = require('mongoose');

// Define the schema with additional fields
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    streak: {type: Number, default: 0},
    lastStreakDate: { type: Date },  // Last date the streak was updated
    maxStreak: { type: Number, default: 0 }  // Maximum streak achieved
});

// Create and export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
