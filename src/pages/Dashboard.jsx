import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import the custom CSS

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in.');
                setLoading(false); // Set loading to false when no token
                return;
            }
            try {
                const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                setError('An error occurred while fetching user data');
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        const fetchGoals = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in.');
                setLoading(false); // Set loading to false when no token
                return;
            }
            try {
                const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/goals', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const userGoals = await response.json();
                    setGoals(userGoals);
                } else {
                    setError('Failed to fetch goals');
                }
            } catch (err) {
                setError('An error occurred while fetching goals');
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchUserData();
        fetchGoals();
    }, []);

    const formatDateToIST = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' };
        return date.toLocaleString('en-GB', options);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="header-title">Welcome Back!</h1>
                <p className="header-subtitle">Here’s a snapshot of your fitness journey and progress.</p>
            </header>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full border-t-4 border-b-4 border-white w-16 h-16"></div>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="error-message">
                            <p className="error-title">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="dashboard-content">
                        {user && (
                            <div className="user-info">
                                <h2 className="user-name">Hello, {user.name}!</h2>
                                <div className="user-details">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                                </div>
                            </div>
                        )}

                        {user && (
                            <div className="user-streak">
                                <h2>Your Streak</h2>
                                <p><strong>Current Streak:</strong> {user.streak || 0} days</p>
                                <p><strong>Max Streak:</strong> {user.maxStreak || 0} days</p>
                                <p><strong>Last Streak Updated:</strong> {formatDateToIST(user.lastStreakDate)}</p>
                            </div>
                        )}

                        {goals.length > 0 && (
                            <div className="goals-section">
                                <h2>Your Goals</h2>
                                <ul className="goals-list">
                                    {goals.map(goal => (
                                        <li key={goal._id} className={`goal-item ${goal.completed ? 'completed' : 'pending'}`}>
                                            <h3 className="goal-title">{goal.title}</h3>
                                            <p className="goal-description">{goal.description}</p>
                                            <p className={`goal-status ${goal.completed ? 'completed-status' : 'pending-status'}`}>
                                                {goal.completed ? 'Completed' : 'Pending'}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
