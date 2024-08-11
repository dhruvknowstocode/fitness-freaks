import React, { useState } from 'react';

const GoalList = ({ goals, onUpdateGoal, onDeleteGoal }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleMarkAsCompleted = async (goalId) => {
    const updatedGoal = { completed: true };
    await onUpdateGoal(goalId, updatedGoal);
  };

  const handleDelete = async (goalId) => {
    await onDeleteGoal(goalId);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 mt-4">Your Goals:</h3>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mb-4"
        onClick={toggleVisibility}
      >
        {isVisible ? 'Hide Goals' : 'Show Goals'}
      </button>
      {isVisible && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <li key={goal._id} className="border p-4 rounded bg-white shadow-md relative">
              {goal.completed && (
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(goal._id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1 mb-2 md:mb-0">
                  <h4 className="text-lg font-bold mb-1">
                    {index + 1}. {goal.title}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      goal.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {goal.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="flex-shrink-0 mt-0 md:mt-0">
                  {!goal.completed && (
                    <button
                      className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => handleMarkAsCompleted(goal._id)}
                    >
                      Mark as Done
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{goal.description}</p>
              <p className="text-gray-500 text-sm mt-1">
                <strong>{goal.completed ? 'Completed At:' : 'Created At:'}</strong> {new Date(goal.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;
