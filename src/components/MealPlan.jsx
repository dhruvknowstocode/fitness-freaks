// src/components/MealPlan.js
import React from 'react';
import MealItem from './MealItem';

const MealPlan = ({ plan }) => {
    return (
        <div className="meal-plan">
            <h2>{`Meal Plan for ${plan.day}`}</h2>
            {plan.meals.map((meal, index) => (
                <MealItem key={index} meal={meal} />
            ))}
            <div className="goals">
                <h3>Nutritional Goals</h3>
                <ul>
                    <li>Total Protein: {plan.nutritionalGoals.protein}g</li>
                    <li>Total Carbs: {plan.nutritionalGoals.carbs}g</li>
                    <li>Total Fats: {plan.nutritionalGoals.fats}g</li>
                </ul>
            </div>
            <div className="advice">
                <h3>Daily Advice</h3>
                <p>{plan.advice}</p>
            </div>
        </div>
    );
};

export default MealPlan;
