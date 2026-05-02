const cardStyles = [
  { bg: 'bg-gradient-to-br from-purple-500 to-purple-700', icon: '📝' },
  { bg: 'bg-gradient-to-br from-orange-400 to-pink-500', icon: '🔥' },
  { bg: 'bg-gradient-to-br from-teal-400 to-cyan-600', icon: '😊' },
];

const StatCard = ({ title, value, index = 0 }) => {
  const style = cardStyles[index % 3];
  return (
    <div className={`${style.bg} rounded-2xl p-6 text-white shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-white/80">{title}</p>
        <span className="text-2xl">{style.icon}</span>
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;