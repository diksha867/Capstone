import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const heroImage =
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80';

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      setError('Please enter name and email.');
      return;
    }
    dispatch(loginSuccess({ name, email }));
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">

      {/* Left — image */}
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <img
          src={heroImage}
          alt="Happy children"
          className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-full"
        />
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center rounded-2xl border border-purple-100 bg-white p-8 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
        
        {/* Logo */}
        <p className="text-3xl mb-1">🧠</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 mb-6 text-sm text-gray-500 dark:text-gray-400">
          A kinder space for your daily mood check-ins.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </p>
          )}

          <button className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-md dark:bg-purple-500 dark:hover:bg-purple-400">
            Login →
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
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