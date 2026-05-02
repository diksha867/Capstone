import React from 'react';

const TipCard = React.memo(({ title, description }) => (
  <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
    <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300">{title}</h3>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
  </div>
));

export default TipCard;
