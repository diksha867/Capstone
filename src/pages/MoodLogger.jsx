import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MoodButton from '../components/MoodButton';
import Toast from '../components/Toast';
import { addMoodEntry } from '../redux/moodSlice';

const moods = [
  { mood: 'Excellent', emoji: '😄' },
  { mood: 'Good', emoji: '🙂' },
  { mood: 'Okay', emoji: '😐' },
  { mood: 'Low', emoji: '😔' },
  { mood: 'Anxious', emoji: '😰' },
  { mood: 'Angry', emoji: '😤' },
];

const MoodLogger = () => {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const next = () => {
    if (step === 1 && !selectedMood) {
      setError('Please select a mood to continue.');
      return;
    }
    setError('');
    setStep((s) => s + 1);
  };

  const save = () => {
    if (!selectedMood) return;
    dispatch(
      addMoodEntry({
        id: Date.now(),
        mood: selectedMood,
        note: note.trim(),
        date: new Date().toISOString(),
      })
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setStep(1);
    setSelectedMood('');
    setNote('');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-2xl font-bold dark:text-white">Mood Logger</h1>
      <p className="text-sm text-gray-500 dark:text-purple-200">Step {step} of 3</p>

      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-3">
          {moods.map((item) => (
            <MoodButton key={item.mood} mood={item.mood} emoji={item.emoji} selectedMood={selectedMood} onClick={setSelectedMood} />
          ))}
        </div>
      )}

      {step === 2 && (
        <textarea
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional: add a short journal note..."
          className="w-full rounded-md border p-3 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
        />
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
          <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Mood: <span className="font-normal text-gray-600 dark:text-gray-300">{selectedMood}</span></p>
          <p className="mt-2 text-sm font-semibold text-purple-700 dark:text-purple-300">Note: <span className="font-normal text-gray-600 dark:text-gray-300">{note || 'No note added.'}</span></p>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        {step > 1 && (
          <button onClick={() => setStep((s) => s - 1)} className="rounded-md border px-4 py-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-purple-200">Previous</button>
        )}
        {step < 3 ? (
          <button onClick={next} className="rounded-md bg-indigo-600 px-4 py-2 text-white dark:bg-purple-500">Next</button>
        ) : (
          <button onClick={save} className="rounded-md bg-emerald-600 px-4 py-2 text-white dark:bg-purple-500">Confirm & Save</button>
        )}
      </div>

      {showToast && <Toast message="Mood logged successfully!" />}
    </div>
  );
};

export default MoodLogger;
