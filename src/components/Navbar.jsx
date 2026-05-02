import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/mood-logger', label: 'Mood Logger' },
  { to: '/journey', label: 'My Journey' },
  { to: '/tips', label: 'Self-Care Tips' },
  { to: '/breathe', label: 'Breathe' },
  { to: '/helplines', label: 'Helplines' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-purple-100 dark:bg-[#1A1033]/90 dark:border-[#2D2450]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        
        {/* Logo */}
        <div>
          <p className="text-xl font-bold text-purple-700 dark:text-purple-300">🧠 MindMate</p>
          <p className="text-xs text-gray-400 dark:text-purple-400">Welcome, {user?.name}</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-1 text-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                  ${isActive
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/40'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full border border-purple-200 px-4 py-1.5 text-sm text-purple-600 font-medium transition hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/40"
          >
            {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full bg-purple-600 px-4 py-1.5 text-sm text-white font-medium transition hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;