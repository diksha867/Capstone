import React from 'react';

const MoodButton = React.memo(({ mood, emoji, selectedMood, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(mood)}
    className={`rounded-lg border px-4 py-3 text-left transition dark:text-white ${
      selectedMood === mood
        ? 'border-indigo-500 bg-indigo-50 dark:bg-[#2D2450]'
        : 'border-gray-200 hover:border-indigo-300 dark:border-[#2D2450] dark:bg-[#1A1033]'
    }`}
  >
    <span className="text-xl">{emoji}</span> <span className="ml-2 font-medium">{mood}</span>
  </button>
));

export default MoodButton;
