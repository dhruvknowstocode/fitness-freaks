import React, { useState } from 'react';
import './WorkoutPlanForm.css';

const WorkoutPlanForm = ({ onGeneratePlan, exercises }) => {
  const [criteria, setCriteria] = useState({
    goal: '',
    level: '',
    frequency: '',
    preferences: ''
  });

  const [errors, setErrors] = useState({});

  // Function to get unique exercise types
  const getUniqueExercises = () => {
    const uniqueExercises = new Set(exercises.map(exercise => exercise.type));
    return Array.from(uniqueExercises);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCriteria(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear the specific error when the field is modified
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Goal
    if (!criteria.goal) {
      newErrors.goal = 'Goal is required.';
    } else if (criteria.goal.length < 3) {
      newErrors.goal = 'Goal must be at least 3 characters long.';
    }

    // Validate Level
    const validLevels = ['Beginner', 'Intermediate', 'Advanced','beginer','intermediate','advanced'];
    if (!criteria.level) {
      newErrors.level = 'Level is required.';
    } else if (!validLevels.includes(criteria.level)) {
      newErrors.level = 'Level must be one of the following: Beginner, Intermediate, Advanced.';
    }

    // Validate Frequency
    const frequencyValue = parseInt(criteria.frequency, 10);
    if (!criteria.frequency) {
      newErrors.frequency = 'Frequency is required.';
    } else if (isNaN(frequencyValue) || frequencyValue < 1 || frequencyValue > 7) {
      newErrors.frequency = 'Frequency must be a number between 1 and 7.';
    }

    // Validate Preferences
    if (!criteria.preferences) {
      newErrors.preferences = 'Please select a preference.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onGeneratePlan(criteria);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Customize Your Workout Plan</h2>
      <p className="form-description">Fill out the details below to generate a workout plan that fits your fitness goals and preferences.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Goal</label>
          <input
            type="text"
            name="goal"
            value={criteria.goal}
            onChange={handleChange}
            className={`border p-2 rounded ${errors.goal && 'border-red-500'}`}
            placeholder="e.g., Build Muscle, Lose Weight"
          />
          {errors.goal && <p className="form-error">{errors.goal}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Level</label>
          <input
            type="text"
            name="level"
            value={criteria.level}
            onChange={handleChange}
            className={`border p-2 rounded ${errors.level && 'border-red-500'}`}
            placeholder="e.g., Beginner, Intermediate, Advanced"
          />
          {errors.level && <p className="form-error">{errors.level}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Frequency</label>
          <input
            type="text"
            name="frequency"
            value={criteria.frequency}
            onChange={handleChange}
            className={`border p-2 rounded ${errors.frequency && 'border-red-500'}`}
            placeholder="e.g., 3 times a week"
          />
          {errors.frequency && <p className="form-error">{errors.frequency}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Preferences</label>
          <select
            name="preferences"
            value={criteria.preferences}
            onChange={handleChange}
            className={`border p-2 rounded ${errors.preferences && 'border-red-500'}`}
          >
            <option value="">Select a preference</option>
            {getUniqueExercises().map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.preferences && <p className="form-error">{errors.preferences}</p>}
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Generate Plan
        </button>
      </form>
    </div>
  );
};

export default WorkoutPlanForm;
