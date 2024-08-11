import React, { useState } from 'react';

const GoalForm = ({ onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAddGoal({ title, description, completed });
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Set a New Goal</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal title"
        className="border p-2 rounded mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Goal description"
        className="border p-2 rounded mb-2 w-full"
      />
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2">Completed</span>
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalForm;
