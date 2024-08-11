// models/Exercise.js
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., cardio, strength, flexibility
  },
  duration: {
    type: Number, // in minutes
    required: false,
  },
  sets: {
    type: Number,
    required: false,
  },
  reps: {
    type: Number,
    required: false,
  },
  difficulty: {
    type: String, // e.g., easy, medium, hard
    required: true,
  },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
