import React, { useState } from 'react';

const GoalList = ({ goals }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 mt-4">Your Goals :</h3>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mb-4"
        onClick={toggleVisibility}
      >
        {isVisible ? 'Hide Goals' : 'Show Goals'}
      </button>
      {isVisible && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <li key={goal._id} className="border p-4 rounded bg-white shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold">
                  {index + 1}. {goal.title}
                </h4>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    goal.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {goal.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{goal.description}</p>
              <p className="text-gray-500 text-sm mt-1">
                <strong>Created At:</strong> {new Date(goal.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;
