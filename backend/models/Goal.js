const mongoose = require('mongoose');

// Define the Goal schema
const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Create the Goal model
const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
