import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import StatCard from "../components/StatCard";
import useDebounce from "../hooks/useDebounce";
import ErrorBoundary from "../components/ErrorBoundary";

const moodMap = {
  Excellent: 5,
  Good: 4,
  Okay: 3,
  Low: 2,
  Anxious: 1,
  Angry: 0,
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const entries = useSelector((state) => state.mood.entries);
  const [quote, setQuote] = useState("Loading your motivational quote...");

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const todayDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const moodCounts = useMemo(
    () =>
      entries.reduce((acc, e) => {
        acc[e.mood] = (acc[e.mood] || 0) + 1;
        return acc;
      }, {}),
    [entries],
  );

  const mostLoggedMood = useMemo(() => {
    if (!entries.length) return "-";
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
  }, [entries, moodCounts]);

  const streak = useMemo(() => {
    if (!entries.length) return 0;
    const uniqueDays = new Set(entries.map((e) => e.date.slice(0, 10)));
    let count = 0;
    const cursor = new Date();
    while (uniqueDays.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [entries]);

  const chartData = useMemo(
    () => Object.entries(moodCounts).map(([mood, count]) => ({ mood, count })),
    [moodCounts],
  );

  const lineData = useMemo(
    () =>
      entries
        .slice(0, 7)
        .map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
          score: moodMap[entry.mood],
        }))
        .reverse(),
    [entries],
  );

  const fetchQuote = useCallback(async () => {
    try {
      const res = await axios.get("https://quotes-api-self.vercel.app/quote");
      setQuote(`"${res.data.quote}" — ${res.data.author}`);
    } catch {
      try {
        const res2 = await axios.get("https://api.adviceslip.com/advice");
        setQuote(`"${res2.data.slip.advice}"`);
      } catch {
        const fallbacks = [
          '"You don\'t have to be positive all the time." — Unknown',
          '"Small steps every day lead to big changes." — Unknown',
          '"Your mental health is a priority." — Unknown',
          '"Be gentle with yourself." — Unknown',
          '"It\'s okay to ask for help." — Unknown',
        ];
        setQuote(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
      }
    }
  }, []);
  const debouncedFetchQuote = useDebounce(fetchQuote, 700);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="space-y-6">
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 p-8 text-white shadow-xl md:p-10">
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/10" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-200">{todayDate}</p>
            <h1 className="mt-1 text-3xl font-bold">
              {greeting}, {user?.name} 👋
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-purple-100">
              {quote}
            </p>
            <button
              onClick={debouncedFetchQuote}
              className="mt-5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              ↻ Refresh quote
            </button>
          </div>
          <div className="hidden text-8xl md:block select-none">🧘‍♀️</div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total logs" value={entries.length} index={0} />
        <StatCard title="Current streak" value={`${streak} day(s)`} index={1} />
        <StatCard title="Most logged mood" value={mostLoggedMood} index={2} />
      </div>

      {/* ── Quick Action Buttons ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <Link
          to="/mood-logger"
          className="btn-purple flex flex-col items-center gap-2 rounded-2xl py-6 font-semibold transition hover:-translate-y-1 hover:shadow-md"
        >
          <span className="text-3xl">📝</span>
          <span className="text-sm">Log mood</span>
        </Link>
        <Link
          to="/journey"
          className="btn-orange flex flex-col items-center gap-2 rounded-2xl py-6 font-semibold transition hover:-translate-y-1 hover:shadow-md"
        >
          <span className="text-3xl">📈</span>
          <span className="text-sm">View journey</span>
        </Link>
        <Link
          to="/tips"
          className="btn-teal flex flex-col items-center gap-2 rounded-2xl py-6 font-semibold transition hover:-translate-y-1 hover:shadow-md"
        >
          <span className="text-3xl">🌿</span>
          <span className="text-sm">Self-care tips</span>
        </Link>
      </div>

      {/* ── Charts ── */}
      <ErrorBoundary>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Bar Chart */}
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#2D2450] dark:bg-[#1A1033]">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 className="text-sm font-semibold text-gray-700 dark:text-purple-300">
                Mood Frequency
              </h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="mood"
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#2D2450] dark:bg-[#1A1033]">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h2 className="text-sm font-semibold text-gray-700 dark:text-purple-300">
                Last 7 Days Trend
              </h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <YAxis
                    domain={[0, 5]}
                    tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    dataKey="score"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Dashboard;
