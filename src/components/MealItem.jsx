// src/components/MealItem.js
import React from 'react';

const MealItem = ({ meal }) => {
    return (
        <div className="meal-section">
            <h3>{meal.name}</h3>
            <ul>
                <li>Protein: {meal.protein}g</li>
                <li>Carbs: {meal.carbs}g</li>
                <li>Fats: {meal.fats}g</li>
            </ul>
        </div>
    );
};

export default MealItem;
