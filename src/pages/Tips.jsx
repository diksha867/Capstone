import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TipCard from '../components/TipCard';
import useDebounce from '../hooks/useDebounce';
import { personalizedTips } from '../data/tipsData';

const Tips = () => {
  const entries = useSelector((state) => state.mood.entries);
  const [advice, setAdvice] = useState('Loading wellness tip...');
  const [exercises, setExercises] = useState([]);

  const lastMood = entries[0]?.mood || 'Okay';

  const fetchAdvice = useCallback(async () => {
    try {
      const res = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(res.data.slip.advice);
    } catch {
      setAdvice('Take a mindful pause. You do not need to solve everything at once.');
    }
  }, []);

  const debouncedAdvice = useDebounce(fetchAdvice, 700);

  const fetchExercises = useCallback(async () => {
    try {
      const res = await axios.get('https://wger.de/api/v2/exercise/?format=json&language=2&limit=5');
      const list = (res.data.results || []).slice(0, 3).map((ex) => ({
        id: ex.id,
        name: ex.name,
        description:
          ex.description?.replace(/<[^>]*>?/gm, '').slice(0, 120) ||
          'Easy body movement exercise.',
      }));
      setExercises(list);
    } catch {
      setExercises([]);
    }
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  useEffect(() => {
    if (lastMood === 'Low' || lastMood === 'Anxious') fetchExercises();
    else setExercises([]);
  }, [lastMood, fetchExercises]);

  const tips = useMemo(() => personalizedTips[lastMood] || personalizedTips.Okay, [lastMood]);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold dark:text-blue-500">Self-Care Tips</h1>

      <div className="rounded-xl bg-purple-700 p-4 text-white">
        <p className="text-sm font-semibold text-white">Wellness tip of the moment</p>
        <p className="mt-2 text-sm text-white">{advice}</p>
        <button onClick={debouncedAdvice} className="mt-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-purple-700">
          Get new tip
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {tips.map((tip, i) => (
          <TipCard key={tip} title={`Personalized Tip ${i + 1}`} description={tip} />
        ))}
      </div>

      {(lastMood === 'Low' || lastMood === 'Anxious') && (
        <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
          <h2 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Suggested Light Exercises</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {exercises.map((ex) => (
              <TipCard key={ex.id} title={ex.name} description={ex.description} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips;
