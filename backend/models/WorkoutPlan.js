// models/WorkoutPlan.js
const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    required: false,
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  }],
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
