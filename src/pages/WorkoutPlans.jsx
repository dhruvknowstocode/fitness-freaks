import React, { useState, useEffect } from 'react';
import WorkoutPlanForm from '../components/WorkoutPlanForm';
import WorkoutPlanDisplay from '../components/WorkoutPlanDisplay';
import { useNavigate } from 'react-router-dom';

const WorkoutPlans = () => {
  const [plan, setPlan] = useState(null);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercises from the backend
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://fitness-freaks-wuyi.onrender.com/exercises');
        if (!response.ok) throw new Error('Failed to fetch exercises');
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const generatePlan = async (criteria) => {
    try {
      const response = await fetch('https://fitness-freaks-wuyi.onrender.com/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(criteria)
      });

      if (!response.ok) throw new Error('Failed to generate workout plan');

      const data = await response.json();
      console.log('Generated plan data:', data); // Check the response
      setPlan(data);
    } catch (error) {
      console.error('Error generating workout plan:', error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-2 py-1 mb-4 sm:mb-4 rounded"
          onClick={() => navigate('/all-plans')}
        >
          Show All Plans
        </button>
      </div>

      <WorkoutPlanForm onGeneratePlan={generatePlan} exercises={exercises} />
      <WorkoutPlanDisplay plan={plan} />
    </div>
  );
};

export default WorkoutPlans;
