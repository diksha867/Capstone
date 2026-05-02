const Helplines = () => {
  const supportImage =
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80';
  const lines = [
    { name: 'iCall', phone: '+91 9152987821', note: 'Mon-Sat mental health support line' },
    { name: 'Vandrevala Foundation', phone: '9999666555', note: '24/7 psychosocial support' },
    { name: 'AASRA', phone: '+91-22-27546669', note: '24/7 suicide prevention helpline' },
    { name: 'Snehi', phone: '+91-22-2772 6771', note: 'Emotional support and counseling' },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-slide relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-[#2D2450]">
        <img src={supportImage} alt="Happy children in a supportive environment" className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/25 via-transparent to-indigo-900/25" />
      </div>
      <div className="animate-fade-slide rounded-2xl bg-gradient-to-r from-pink-100 to-violet-100 p-5 text-pink-800 shadow-md dark:from-[#1A1033] dark:to-[#1A1033] dark:border dark:border-[#2D2450] dark:text-purple-200">
        <h1 className="text-2xl font-bold dark:text-white">You are not alone.</h1>
        <p className="mt-2">If things feel overwhelming, reaching out is a strong and brave step.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {lines.map((line) => (
          <div key={line.name} className="animate-fade-slide rounded-2xl border border-purple-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-[#2D2450] dark:bg-[#1A1033] dark:hover:border-indigo-500">
            <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">{line.name}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{line.phone}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{line.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helplines;
