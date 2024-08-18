import React, { useState, useEffect } from 'react';

const AllWorkoutPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPreferences, setSelectedPreferences] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch("https://fitness-freaks-wuyi.onrender.com/plans");
                if (!response.ok) throw new Error('Failed to fetch plans');
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };
        fetchPlans();
    }, []);

    const filteredPlans = plans.filter(plan =>
        (selectedPreferences === 'All' || plan.preferences.includes(selectedPreferences)) &&
        (searchTerm === '' || plan.goal.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold flex-grow mr-4">All Workout Plans</h1>
                <input
                    type="text"
                    placeholder="Search by goal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-1/3 sm:w-1/4"
                />
            </div>
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedPreferences('All')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedPreferences('Cardio')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        Cardio
                    </button>
                    <button
                        onClick={() => setSelectedPreferences('Strength')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        Strength
                    </button>
                    <button
                        onClick={() => setSelectedPreferences('Flexibility')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        Flexibility
                    </button>
                    <button
                        onClick={() => setSelectedPreferences('Core')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        Core
                    </button>
                    <button
                        onClick={() => setSelectedPreferences('Plyometrics')}
                        className="px-2 py-1 bg-gray-200 rounded mb-2 sm:mb-0"
                    >
                        Plyometrics
                    </button>
                    {/* Add more buttons for other preferences */}
                </div>
            </div>
            {filteredPlans.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPlans.map((plan) => (
                        <div key={plan._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">{plan.goal} - {plan.level}</h2>
                            <p className="mb-2"><strong>Frequency:</strong> {plan.frequency}</p>
                            <p className="mb-2"><strong>Preferences:</strong> {plan.preferences.join(', ')}</p>
                            <h3 className="text-lg font-semibold mt-4 mb-2">Exercises:</h3>
                            <ul className="list-disc list-inside pl-4">
                                {plan.exercises.map((exercise) => (
                                    <li key={exercise._id}>
                                        <strong>{exercise.name}</strong> ({exercise.type}) - {exercise.difficulty}
                                        {exercise.duration && <span>, Duration: {exercise.duration} mins</span>}
                                        {exercise.sets && <span>, Sets: {exercise.sets}</span>}
                                        {exercise.reps && <span>, Reps: {exercise.reps}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No workout plans available.</p>
            )}
        </div>
    );
};

export default AllWorkoutPlans;
