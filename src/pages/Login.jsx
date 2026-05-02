import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const heroImage =
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80';

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !age || !gender || !mood) {
      setError('Please fill in all fields.');
      return;
    }
    if (age < 5 || age > 100) {
      setError('Please enter a valid age.');
      return;
    }
    dispatch(loginSuccess({ name, email, age, gender, mood }));
    navigate('/dashboard');
  };

  const moods = [
    { emoji: '😄', label: 'Excellent' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😔', label: 'Low' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😤', label: 'Angry' },
  ];

  return (
    <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">

      {/* Left — floating image */}
      <div className="animate-float overflow-hidden rounded-2xl shadow-xl">
        <img
          src={heroImage}
          alt="Happy children"
          className="h-64 w-full object-cover md:h-full"
        />
      </div>

      {/* Right — form */}
      <div className="animate-fade-slide flex flex-col justify-center rounded-2xl border border-purple-100 bg-white p-8 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">

        <p className="mb-1 text-3xl">🧠</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome to MindMate
        </h1>
        <p className="mb-5 mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tell us a little about yourself to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your name
            </label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white dark:placeholder-gray-400"
              placeholder="e.g. Diksha"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white dark:placeholder-gray-400"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Age + Gender in one row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Age
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white dark:placeholder-gray-400"
                placeholder="e.g. 21"
                type="number"
                min="5"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Onboarding mood */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              How are you feeling right now?
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMood(m.label)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition
                    ${mood === m.label
                      ? 'border-purple-500 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300 hover:bg-purple-50 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-gray-300'
                    }`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              ⚠️ {error}
            </p>
          )}

          {/* Submit */}
          <button className="animate-pulse-glow w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-md dark:bg-purple-500 dark:hover:bg-purple-400">
            Get started →
          </button>

        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No account?{' '}
          <Link to="/signup" className="font-semibold text-purple-600 hover:underline dark:text-purple-400">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;