import { useEffect, useRef, useState } from 'react';

const phases = [
  { name: 'Inhale', duration: 4, scale: 'scale-125' },
  { name: 'Hold', duration: 7, scale: 'scale-125' },
  { name: 'Exhale', duration: 8, scale: 'scale-90' },
];

const Breathe = () => {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [seconds, setSeconds] = useState(phases[0].duration);
  const [cycles, setCycles] = useState(Number(localStorage.getItem('mindmate_breath_cycles') || 0));
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        setPhaseIndex((idx) => {
          const next = (idx + 1) % phases.length;
          if (next === 0) {
            setCycles((c) => {
              const updated = c + 1;
              localStorage.setItem('mindmate_breath_cycles', String(updated));
              return updated;
            });
          }
          setSeconds(phases[next].duration);
          return next;
        });

        return 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  const phase = phases[phaseIndex];

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-purple-100 bg-white p-6 text-center shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
      <h1 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Breathing Exercise</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{phase.name} - {seconds}s</p>

      <div className="my-8 flex justify-center">
        <div className={`flex h-44 w-44 items-center justify-center rounded-full bg-indigo-200 text-xl font-bold text-indigo-800 transition-all duration-1000 dark:bg-indigo-800 dark:text-indigo-100 ${phase.scale}`}>
          {phase.name}
        </div>
      </div>

      <button onClick={() => setRunning((r) => !r)} className="rounded-md bg-indigo-600 px-4 py-2 text-white dark:bg-purple-500">
        {running ? 'Stop' : 'Start'}
      </button>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        You have completed {cycles} breathing cycles today
      </p>
    </div>
  );
};

export default Breathe;
