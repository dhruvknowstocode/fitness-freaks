const mongoose = require('mongoose');
const MealPlanAndGoals = require('./models/MealPlanAndGoals'); // Import the updated model
require('dotenv').config();

const mealPlans = [
    {
        breakfast: { name: 'Breakfast', protein: 30, carbs: 40, fats: 10 },
        lunch: { name: 'Lunch', protein: 40, carbs: 50, fats: 15 },
        dinner: { name: 'Dinner', protein: 35, carbs: 45, fats: 20 },
        nutritionalGoals: { protein: 105, carbs: 135, fats: 45 },
        advice: 'Ensure to drink enough water throughout the day.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 25, carbs: 35, fats: 8 },
        lunch: { name: 'Lunch', protein: 45, carbs: 55, fats: 20 },
        dinner: { name: 'Dinner', protein: 30, carbs: 40, fats: 15 },
        nutritionalGoals: { protein: 100, carbs: 130, fats: 50 },
        advice: 'Try to include some greens in your lunch.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 20, carbs: 30, fats: 5 },
        lunch: { name: 'Lunch', protein: 35, carbs: 45, fats: 15 },
        dinner: { name: 'Dinner', protein: 40, carbs: 55, fats: 25 },
        nutritionalGoals: { protein: 95, carbs: 130, fats: 45 },
        advice: 'Avoid heavy meals late at night.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 25, carbs: 35, fats: 8 },
        lunch: { name: 'Lunch', protein: 35, carbs: 45, fats: 12 },
        dinner: { name: 'Dinner', protein: 30, carbs: 40, fats: 15 },
        nutritionalGoals: { protein: 90, carbs: 120, fats: 35 },
        advice: 'Include some fruit with your breakfast.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 20, carbs: 30, fats: 7 },
        lunch: { name: 'Lunch', protein: 40, carbs: 50, fats: 15 },
        dinner: { name: 'Dinner', protein: 35, carbs: 45, fats: 20 },
        nutritionalGoals: { protein: 95, carbs: 125, fats: 42 },
        advice: 'Opt for whole grains instead of refined ones.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 30, carbs: 40, fats: 10 },
        lunch: { name: 'Lunch', protein: 35, carbs: 45, fats: 15 },
        dinner: { name: 'Dinner', protein: 25, carbs: 35, fats: 10 },
        nutritionalGoals: { protein: 90, carbs: 120, fats: 35 },
        advice: 'Keep dinner light and balanced.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 28, carbs: 38, fats: 10 },
        lunch: { name: 'Lunch', protein: 32, carbs: 42, fats: 14 },
        dinner: { name: 'Dinner', protein: 40, carbs: 50, fats: 18 },
        nutritionalGoals: { protein: 100, carbs: 130, fats: 42 },
        advice: 'Start your day with a balanced breakfast.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 25, carbs: 35, fats: 8 },
        lunch: { name: 'Lunch', protein: 40, carbs: 50, fats: 15 },
        dinner: { name: 'Dinner', protein: 32, carbs: 42, fats: 12 },
        nutritionalGoals: { protein: 97, carbs: 127, fats: 35 },
        advice: 'Opt for lean proteins and fresh veggies.'
    },
    {
        breakfast: { name: 'Breakfast', protein: 22, carbs: 30, fats: 8 },
        lunch: { name: 'Lunch', protein: 35, carbs: 45, fats: 12 },
        dinner: { name: 'Dinner', protein: 30, carbs: 40, fats: 15 },
        nutritionalGoals: { protein: 87, carbs: 115, fats: 35 },
        advice: 'Avoid high-carb dinners.'
    }
];

const mongourl = process.env.MONGODB_URI;

async function main() {
    try {
        await mongoose.connect(mongourl);
        console.log("Connection successful");

        // Clear existing data
        await MealPlanAndGoals.deleteMany({});

        // Insert meal plans and nutritional goals
        await MealPlanAndGoals.insertMany(mealPlans);

        console.log("Meal plans and nutritional goals added");

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

main();
