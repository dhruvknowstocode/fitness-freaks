const mongoose = require('mongoose');
const WorkoutPlan = require('./models/WorkoutPlan');
const Exercise = require('./models/Exercise');
require('dotenv').config();

const mongourl = process.env.MONGODB_URI;

const exercises = [
    // Cardio
    { name: 'Jumping Jacks', type: 'Cardio', duration: 5, difficulty: 'Easy' },
    { name: 'Burpees', type: 'Cardio', duration: 10, difficulty: 'Hard' },
    { name: 'Mountain Climbers', type: 'Cardio', duration: 5, difficulty: 'Medium' },
    { name: 'High Knees', type: 'Cardio', duration: 5, difficulty: 'Medium' },
    { name: 'Skipping Rope', type: 'Cardio', duration: 10, difficulty: 'Medium' },
    { name: 'Rowing Machine', type: 'Cardio', duration: 20, difficulty: 'Hard' },
    { name: 'Cycling', type: 'Cardio', duration: 45, difficulty: 'Medium' },
    { name: 'Swimming', type: 'Cardio', duration: 30, difficulty: 'Medium' },
    { name: 'Interval Sprints', type: 'Cardio', duration: 20, difficulty: 'Hard' },
    { name: 'Running', type: 'Cardio', duration: 30, difficulty: 'Medium' },

    // Strength
    { name: 'Push-ups', type: 'Strength', sets: 3, reps: 12, difficulty: 'Medium' },
    { name: 'Bodyweight Squats', type: 'Strength', sets: 3, reps: 15, difficulty: 'Medium' },
    { name: 'Lunges', type: 'Strength', sets: 3, reps: 12, difficulty: 'Medium' },
    { name: 'Plank', type: 'Strength', duration: 1, difficulty: 'Medium' },
    { name: 'Russian Twists', type: 'Strength', sets: 3, reps: 15, difficulty: 'Medium' },
    { name: 'Leg Raises', type: 'Strength', sets: 3, reps: 15, difficulty: 'Medium' },
    { name: 'Bench Press', type: 'Strength', sets: 4, reps: 8, difficulty: 'Hard' },
    { name: 'Deadlifts', type: 'Strength', sets: 3, reps: 10, difficulty: 'Hard' },
    { name: 'Pull-ups', type: 'Strength', sets: 3, reps: 8, difficulty: 'Hard' },
    { name: 'Leg Press', type: 'Strength', sets: 4, reps: 12, difficulty: 'Hard' },
    { name: 'Dumbbell Rows', type: 'Strength', sets: 3, reps: 12, difficulty: 'Medium' },
    { name: 'Bicep Curls', type: 'Strength', sets: 3, reps: 12, difficulty: 'Medium' },
    { name: 'Tricep Dips', type: 'Strength', sets: 3, reps: 12, difficulty: 'Medium' },
    { name: 'Shoulder Press', type: 'Strength', sets: 3, reps: 10, difficulty: 'Medium' },

    // Flexibility
    { name: 'Downward Dog', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Child’s Pose', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Cat-Cow Stretch', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Standing Forward Bend', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Seated Forward Bend', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Butterfly Stretch', type: 'Flexibility', duration: 5, difficulty: 'Easy' },
    { name: 'Cobra Stretch', type: 'Flexibility', duration: 5, difficulty: 'Medium' },
    { name: 'Lizard Pose', type: 'Flexibility', duration: 5, difficulty: 'Medium' },

    // Core
    { name: 'Sit-ups', type: 'Core', sets: 3, reps: 15, difficulty: 'Medium' },
    { name: 'Bicycle Crunches', type: 'Core', sets: 3, reps: 20, difficulty: 'Medium' },
    { name: 'V-ups', type: 'Core', sets: 3, reps: 15, difficulty: 'Hard' },
    { name: 'Hanging Leg Raises', type: 'Core', sets: 3, reps: 12, difficulty: 'Hard' },
    { name: 'Toe Touches', type: 'Core', sets: 3, reps: 15, difficulty: 'Medium' },

    // Plyometrics
    { name: 'Box Jumps', type: 'Plyometrics', sets: 3, reps: 12, difficulty: 'Hard' },
    { name: 'Jump Squats', type: 'Plyometrics', sets: 3, reps: 15, difficulty: 'Hard' },
    { name: 'Burpee Box Jumps', type: 'Plyometrics', sets: 3, reps: 12, difficulty: 'Hard' },
    { name: 'Clap Push-ups', type: 'Plyometrics', sets: 3, reps: 10, difficulty: 'Hard' },
];

const workoutPlans = [
    {
        goal: 'Weight Loss',
        level: 'Beginner',
        frequency: '3 days/week',
        preferences: ['Cardio', 'Strength'],
        exercises: [
            'Jumping Jacks',
            'Bodyweight Squats',
            'High Knees',
            'Push-ups',
            'Plank'
        ]
    },
    {
        goal: 'Muscle Gain',
        level: 'Intermediate',
        frequency: '4 days/week',
        preferences: ['Strength', 'Core'],
        exercises: [
            'Bench Press',
            'Deadlifts',
            'Pull-ups',
            'Bicep Curls',
            'V-ups'
        ]
    },
    {
        goal: 'Flexibility',
        level: 'Beginner',
        frequency: '2 days/week',
        preferences: ['Flexibility'],
        exercises: [
            'Downward Dog',
            'Child’s Pose',
            'Cobra Stretch',
            'Butterfly Stretch',
            'Lizard Pose'
        ]
    },
    {
        goal: 'Endurance',
        level: 'Advanced',
        frequency: '5 days/week',
        preferences: ['Cardio', 'Plyometrics'],
        exercises: [
            'Cycling',
            'Swimming',
            'Interval Sprints',
            'Box Jumps',
            'Jump Squats'
        ]
    },
    {
        goal: 'Strength & Conditioning',
        level: 'Advanced',
        frequency: '4 days/week',
        preferences: ['Strength', 'Plyometrics'],
        exercises: [
            'Bench Press',
            'Leg Press',
            'Deadlifts',
            'Burpee Box Jumps',
            'Clap Push-ups'
        ]
    },
    {
        goal: 'Core Strength',
        level: 'Intermediate',
        frequency: '3 days/week',
        preferences: ['Core'],
        exercises: [
            'Sit-ups',
            'Bicycle Crunches',
            'V-ups',
            'Hanging Leg Raises',
            'Toe Touches'
        ]
    },
];

async function main() {
    try {
        await mongoose.connect(mongourl);
        console.log("Connection successful");

        await WorkoutPlan.deleteMany({});
        await Exercise.deleteMany({});
        
        await Exercise.insertMany(exercises);
        console.log('Exercises added successfully!');

        for (const plan of workoutPlans) {
            // Find the exercises by name
            const exerciseDocuments = await Exercise.find({ name: { $in: plan.exercises } });

            // Check for any missing exercises
            const missingExercises = plan.exercises.filter(name => 
                !exerciseDocuments.some(doc => doc.name === name)
            );
            if (missingExercises.length) {
                console.warn('Warning: Missing exercises for workout plan:', missingExercises);
            }

            // Add exercise IDs to the workout plan
            const exerciseIds = exerciseDocuments.map(exercise => exercise._id);

            const workoutPlan = new WorkoutPlan({
                goal: plan.goal,
                level: plan.level,
                frequency: plan.frequency,
                preferences: plan.preferences,
                exercises: exerciseIds,
            });

            await workoutPlan.save();
        }

        console.log('Workout plans added successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

main();
