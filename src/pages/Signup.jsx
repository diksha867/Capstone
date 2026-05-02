import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupSuccess } from '../redux/authSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('All fields are required.');
      return;
    }
    dispatch(signupSuccess({ name, email }));
    navigate('/dashboard');
  };

  return (
    <div className="mindmate-card mx-auto mt-20 max-w-md rounded-2xl border border-purple-100 p-6 shadow-sm">
      <h1 className="text-2xl font-bold dark:text-white">Create your MindMate account</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input className="w-full rounded-md border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-md border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white dark:bg-purple-500 dark:hover:bg-purple-400">Sign up</button>
      </form>
      <p className="mt-4 text-sm dark:text-purple-200">Already have an account? <Link to="/login" className="text-indigo-600 dark:text-purple-200">Login</Link></p>
    </div>
  );
};

export default Signup;
