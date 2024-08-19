import React, { useState, useEffect } from 'react';
import './NutrientsPage.css'; // Import custom CSS
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutrientsPage = () => {
    const [mealPlans, setMealPlans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState(null); // Timer state
    const itemsPerPage = 1;

    useEffect(() => {
        const fetchInitialStreak = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }   
            console.log(token);
            try {
                const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response);
                if (response.ok) {
                    const userData = await response.json();
                    setStreak(userData.streak);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                setError('An error occurred while fetching initial streak');
            }
        };
    
        fetchInitialStreak();
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fitness-freaks-wuyi.onrender.com/meal-plans-and-goals');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Data:', data);

                if (Array.isArray(data)) {
                    setMealPlans(data);
                } else {
                    console.error('Unexpected data structure:', data);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Timer to update streak
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            const timeLeft = endOfDay - now;
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            return { hours, minutes, seconds };
        };

        const timerInterval = setInterval(() => {
            setTimer(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const totalPages = Math.ceil(mealPlans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPlans = mealPlans.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePlanSelect = async (planId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
        }
        console.log(token);
        try {
            const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                console.log('User Data:', userData);

                console.log(userData._id);

                const updatedResponse = await fetch(`https://fitness-freaks-wuyi.onrender.com/update-streak/${userData._id}`, {
                    method: 'POST',
                });
                if (!updatedResponse.ok) {
                    throw new Error('Failed to update streak');
                }
                // console.log(updatedResponse);
                const streakData = await updatedResponse.json();
                console.log(streakData);
                setStreak(streakData.streak);
                setSelectedPlanId(planId);
            } else {
                setError('Failed to fetch user data');
            }
        } catch (err) {
            setError('An error occurred while fetching user data');
        }
        // const today = new Date().toISOString().split('T')[0];
        // console.log(today);
        // console.log(planId);
    };

    const getMotivationalMessage = () => {
        if (streak === 1) {
            return "Great start! Keep it up!";
        } else if (streak < 7) {
            return "You're on a roll!";
        } else if (streak >= 7) {
            return "Fantastic! You've hit a weekly streak!";
        } else if (streak >= 30) {
            return "Incredible! You're a streak master!";
        }
        return "Keep going! Every day counts!";
    };

    const pieChartData = currentPlans.length > 0 ? {
        labels: ['Protein', 'Carbs', 'Fats'],
        datasets: [
            {
                label: 'Nutrient Breakdown',
                data: [
                    currentPlans[0].nutritionalGoals.protein,
                    currentPlans[0].nutritionalGoals.carbs,
                    currentPlans[0].nutritionalGoals.fats,
                ],
                backgroundColor: ['#1d4ed8', '#4ade80', '#f87171'],
                borderColor: ['#1d4ed8', '#4ade80', '#f87171'],
                borderWidth: 1,
            },
        ],
    } : null;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePageChange(currentPage - 1);
            } else if (event.key === 'ArrowRight') {
                handlePageChange(currentPage + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage, totalPages]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container2">
            <div className="timer">
                <h2>Time Left Today: {timer ? `${timer.hours}h ${timer.minutes}m ${timer.seconds}s` : 'Calculating...'}</h2>
            </div>
            <div className="grid">
                {currentPlans.map((plan) => (
                    <div
                        key={plan._id}
                        className={`meal-plan-card  first pie-chart-card ${selectedPlanId === plan._id ? 'selected' : ''}`}
                        onClick={() => handlePlanSelect(plan._id)}
                    >
                        <h2 className="meal-plan-title">#{currentPage} Meal Plan</h2>
                        <div className="meal-plan-goals">
                            <p><strong>Protein Goal:</strong> {plan.nutritionalGoals.protein}g</p>
                            <p><strong>Carbs Goal:</strong> {plan.nutritionalGoals.carbs}g</p>
                            <p><strong>Fats Goal:</strong> {plan.nutritionalGoals.fats}g</p>
                        </div>
                        <div className="meal-plan-meals">
                            <div className="meal">
                                <h3 className="meal-title">{plan.breakfast.name}</h3>
                                <p><strong>Protein:</strong> {plan.breakfast.protein}g</p>
                                <p><strong>Carbs:</strong> {plan.breakfast.carbs}g</p>
                                <p><strong>Fats:</strong> {plan.breakfast.fats}g</p>
                            </div>
                            <div className="meal">
                                <h3 className="meal-title">{plan.lunch.name}</h3>
                                <p><strong>Protein:</strong> {plan.lunch.protein}g</p>
                                <p><strong>Carbs:</strong> {plan.lunch.carbs}g</p>
                                <p><strong>Fats:</strong> {plan.lunch.fats}g</p>
                            </div>
                            <div className="meal">
                                <h3 className="meal-title">{plan.dinner.name}</h3>
                                <p><strong>Protein:</strong> {plan.dinner.protein}g</p>
                                <p><strong>Carbs:</strong> {plan.dinner.carbs}g</p>
                                <p><strong>Fats:</strong> {plan.dinner.fats}g</p>
                            </div>
                        </div>
                        <p className="advice"><strong>Advice:</strong> {plan.advice}</p>
                    </div>
                ))}
                {pieChartData && (
                    <div className="meal-plan-card pie-chart-card">
                        <h2 className="meal-plan-title pie-title">Nutrient Breakdown</h2>
                        <Pie data={pieChartData} />
                    </div>
                )}
            </div>
            <div className="pagination-container">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
            <div className="streak-info p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">Streak: {streak} days</h2>
                <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-2">
                    <div
                        className="absolute top-0 left-0 h-full bg-green-500 transition-width duration-500"
                        style={{ width: `${(streak / 30) * 100}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-gray-600">{getMotivationalMessage()}</p>
            </div>
        </div>
    );
};

export default NutrientsPage;
