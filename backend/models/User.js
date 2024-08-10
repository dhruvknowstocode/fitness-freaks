// models/User.js
const mongoose = require('mongoose');

// Define the schema with additional fields
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
});

// Create and export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
