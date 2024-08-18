const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a meal
const MealSchema = new Schema({
  name: { type: String, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
});

// Define the schema for a meal plan
const MealPlanAndGoalsSchema = new Schema({
  breakfast: MealSchema,
  lunch: MealSchema,
  dinner: MealSchema,
  nutritionalGoals: {
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  advice: { type: String } // Optional advice or tips related to the meal plan
});

// Create and export the model
const MealPlanAndGoals = mongoose.model('MealPlanAndGoals', MealPlanAndGoalsSchema);
module.exports = MealPlanAndGoals;
