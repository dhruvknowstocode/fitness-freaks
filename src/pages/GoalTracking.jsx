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

    const updateGoal = async (id, updatedGoal) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await fetch(`http://localhost:8080/api/goals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the headers
            },
            body: JSON.stringify(updatedGoal),
        });
        const data = await response.json();
        setGoals(goals.map(goal => (goal._id === id ? data : goal)));
    };

    const deleteGoal = async (id) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        try {
            const response = await fetch(`http://localhost:8080/api/goals/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token to the headers
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete goal');
            }
    
            // Update the state to remove the deleted goal
            setGoals(goals.filter(goal => goal._id !== id));
        } catch (error) {
            console.error('Error deleting goal:', error);
            // You might want to show an error message to the user here
        }
    };    

    return (
        <div>
            <div className="container mx-auto p-4">
                <GoalForm onAddGoal={addGoal} />
                <GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal}/>
            </div>
        </div>
    );
};

export default GoalTracking;
