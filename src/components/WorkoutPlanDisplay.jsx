import React, { useState, useEffect } from 'react';
import './WorkoutPlanDisplay.css'; // Importing the CSS file for styling

const WorkoutPlanDisplay = ({ plan }) => {
  const [exerciseDetails, setExerciseDetails] = useState([]);

  useEffect(() => {
    if (plan && plan.exercises.length > 0) {
      const fetchExerciseDetails = async () => {
        try {
          const responses = await Promise.all(
            plan.exercises.map(id =>
              fetch(`http://localhost:8080/exercises/${id}`).then(res => res.json())
            )
          );
          setExerciseDetails(responses);
        } catch (error) {
          console.error('Error fetching exercise details:', error);
        }
      };

      fetchExerciseDetails();
    }
  }, [plan]);

  if (!plan) {
    return <div className="no-plan">No plan available</div>;
  }

  return (
    <div className="workout-plan-container mt-2">
      <h2 className="workout-plan-title">Workout Plan</h2>
      <div className="plan-info">
        <p><strong>Goal:</strong> {plan.goal}</p>
        <p><strong>Level:</strong> {plan.level}</p>
        <p><strong>Frequency:</strong> {plan.frequency} days per week</p>
        <p><strong>Preferences:</strong> {plan.preferences}</p>
      </div>
      <h3 className="exercise-title">Exercises:</h3>
      <div className="exercise-cards">
        {exerciseDetails.length > 0 ? (
          exerciseDetails.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <div className="exercise-number">
                {index + 1}.
              </div>
              <div className="exercise-content">
                <h4 className="exercise-name">{exercise.name}</h4>
                <p><strong>Type:</strong> {exercise.type}</p>
                {exercise.duration && <p><strong>Duration:</strong> {exercise.duration} minutes</p>}
                {exercise.sets && <p><strong>Sets:</strong> {exercise.sets}</p>}
                {exercise.reps && <p><strong>Reps:</strong> {exercise.reps}</p>}
                <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-exercises">No exercises found</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanDisplay;
