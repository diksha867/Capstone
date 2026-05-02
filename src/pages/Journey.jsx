import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
} from 'recharts';
import StatCard from '../components/StatCard';
import ErrorBoundary from '../components/ErrorBoundary';

const moodMap = { Excellent: 5, Good: 4, Okay: 3, Low: 2, Anxious: 1, Angry: 0 };
const PAGE_SIZE = 5;

const Journey = () => {
  const entries = useSelector((state) => state.mood.entries);
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [page, setPage] = useState(1);

  const moodCounts = useMemo(
    () =>
      entries.reduce((acc, e) => {
        acc[e.mood] = (acc[e.mood] || 0) + 1;
        return acc;
      }, {}),
    [entries]
  );

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

  const commonMood = useMemo(() => {
    if (!entries.length) return '-';
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
  }, [entries, moodCounts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = entries.filter((entry) => entry.mood.toLowerCase().includes(q));

    if (startDate) {
      list = list.filter((entry) => new Date(entry.date) >= new Date(startDate));
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      list = list.filter((entry) => new Date(entry.date) <= end);
    }

    list.sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [entries, query, startDate, endDate, sortOrder]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const barData = useMemo(
    () => Object.entries(moodCounts).map(([mood, count]) => ({ mood, count })),
    [moodCounts]
  );

  const lineData = useMemo(
    () =>
      entries
        .slice(0, 7)
        .map((entry) => ({
          date: new Date(entry.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          }),
          score: moodMap[entry.mood],
        }))
        .reverse(),
    [entries]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">My Journey</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total logs" value={entries.length} />
        <StatCard title="Current streak" value={`${streak} day(s)`} />
        <StatCard title="Most common mood" value={commonMood} />
      </div>

      <ErrorBoundary>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
            <h2 className="mb-3 text-sm font-semibold text-purple-700 dark:text-purple-300">Mood Frequency</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="mood" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
            <h2 className="mb-3 text-sm font-semibold text-purple-700 dark:text-purple-300">Last 7 Days Mood Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line dataKey="score" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </ErrorBoundary>

      <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm dark:border-[#2D2450] dark:bg-[#1A1033]">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search mood..."
            className="rounded border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="rounded border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="rounded border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
          />
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="rounded border p-2 dark:border-[#2D2450] dark:bg-[#2D2450] dark:text-white"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <div className="mt-4 space-y-3">
          {paginated.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">No entries match your filters.</p>
          ) : (
            paginated.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-purple-100 bg-white p-3 dark:border-[#2D2450] dark:bg-[#1A1033]">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {entry.mood} - {new Date(entry.date).toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{entry.note || 'No note provided.'}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50 dark:bg-[#2D2450] dark:text-purple-200"
          >
            Previous
          </button>
          <p className="text-sm dark:text-purple-200">Page {page} / {totalPages}</p>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50 dark:bg-[#2D2450] dark:text-purple-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Journey;
