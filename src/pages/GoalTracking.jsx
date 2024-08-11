import React, { useState, useEffect } from 'react';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';

const GoalTracking = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            const response = await fetch('http://localhost:8080/api/goals', {
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token to the headers
                }
            });
            const data = await response.json();
            setGoals(data);
        };
        fetchGoals();
    }, []);

    const addGoal = async (newGoal) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await fetch('http://localhost:8080/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the headers
            },
            body: JSON.stringify(newGoal),
        });
        const data = await response.json();
        setGoals([...goals, data]);
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <GoalForm onAddGoal={addGoal} />
                <GoalList goals={goals} />
            </div>
        </div>
    );
};

export default GoalTracking;
