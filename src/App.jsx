import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoodLogger from "./pages/MoodLogger";
import Journey from "./pages/Journey";
import Tips from "./pages/Tips";

const Breathe = lazy(() => import("./pages/Breathe"));
const Helplines = lazy(() => import("./pages/Helplines"));

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <div
      className="relative min-h-screen text-gray-900 dark:text-white"
      style={{
        background:
          mode === "dark"
            ? "#0F0A1E"
            : "linear-gradient(135deg, #ede9fe 0%, #fce7f3 35%, #dbeafe 70%, #d1fae5 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Light mode decorations ── */}
      {mode === "light" && (
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          {/* big color blobs */}
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-120px",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "-80px",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(244,114,182,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "10%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "-60px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "-50px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
            }}
          />

          {/* LEFT SIDE emojis */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
              fontSize: "52px",
              opacity: 0.55,
              transform: "rotate(-15deg)",
            }}
          >
            🌸
          </div>
          <div
            style={{
              position: "absolute",
              top: "18%",
              left: "1%",
              fontSize: "48px",
              opacity: 0.5,
              transform: "rotate(10deg)",
            }}
          >
            🍃
          </div>
          <div
            style={{
              position: "absolute",
              top: "32%",
              left: "2%",
              fontSize: "56px",
              opacity: 0.5,
              transform: "rotate(-8deg)",
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              top: "47%",
              left: "1%",
              fontSize: "50px",
              opacity: 0.5,
              transform: "rotate(15deg)",
            }}
          >
            ☁️
          </div>
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "2%",
              fontSize: "52px",
              opacity: 0.5,
              transform: "rotate(-10deg)",
            }}
          >
            🌺
          </div>
          <div
            style={{
              position: "absolute",
              top: "74%",
              left: "1%",
              fontSize: "48px",
              opacity: 0.5,
              transform: "rotate(8deg)",
            }}
          >
            🍀
          </div>
          <div
            style={{
              position: "absolute",
              top: "87%",
              left: "2%",
              fontSize: "50px",
              opacity: 0.45,
              transform: "rotate(-5deg)",
            }}
          >
            🌼
          </div>

          {/* RIGHT SIDE emojis */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              right: "2%",
              fontSize: "52px",
              opacity: 0.55,
              transform: "rotate(12deg)",
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              top: "18%",
              right: "1%",
              fontSize: "50px",
              opacity: 0.5,
              transform: "rotate(-10deg)",
            }}
          >
            🌸
          </div>
          <div
            style={{
              position: "absolute",
              top: "32%",
              right: "2%",
              fontSize: "54px",
              opacity: 0.5,
              transform: "rotate(8deg)",
            }}
          >
            ☁️
          </div>
          <div
            style={{
              position: "absolute",
              top: "47%",
              right: "1%",
              fontSize: "48px",
              opacity: 0.5,
              transform: "rotate(-15deg)",
            }}
          >
            🍃
          </div>
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "2%",
              fontSize: "52px",
              opacity: 0.5,
              transform: "rotate(10deg)",
            }}
          >
            🌺
          </div>
          <div
            style={{
              position: "absolute",
              top: "74%",
              right: "1%",
              fontSize: "50px",
              opacity: 0.5,
              transform: "rotate(-8deg)",
            }}
          >
            🌸
          </div>
          <div
            style={{
              position: "absolute",
              top: "87%",
              right: "2%",
              fontSize: "48px",
              opacity: 0.45,
              transform: "rotate(5deg)",
            }}
          >
            🍀
          </div>

          {/* TOP and BOTTOM scattered */}
          <div
            style={{
              position: "absolute",
              top: "1%",
              left: "20%",
              fontSize: "44px",
              opacity: 0.4,
              transform: "rotate(-5deg)",
            }}
          >
            ☁️
          </div>
          <div
            style={{
              position: "absolute",
              top: "1%",
              left: "50%",
              fontSize: "40px",
              opacity: 0.35,
              transform: "rotate(8deg)",
            }}
          >
            🌸
          </div>
          <div
            style={{
              position: "absolute",
              top: "1%",
              right: "15%",
              fontSize: "42px",
              opacity: 0.4,
              transform: "rotate(-8deg)",
            }}
          >
            🍃
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "1%",
              left: "20%",
              fontSize: "44px",
              opacity: 0.4,
              transform: "rotate(10deg)",
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "1%",
              left: "45%",
              fontSize: "40px",
              opacity: 0.35,
              transform: "rotate(-6deg)",
            }}
          >
            🌼
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "1%",
              right: "15%",
              fontSize: "42px",
              opacity: 0.4,
              transform: "rotate(8deg)",
            }}
          >
            ☁️
          </div>
        </div>
      )}

      {/* ── Dark mode decorations ── */}
      {mode === "dark" && (
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "-60px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              fontSize: "16px",
              opacity: 0.3,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              top: "25%",
              right: "20%",
              fontSize: "12px",
              opacity: 0.25,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "8%",
              fontSize: "20px",
              opacity: 0.2,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              top: "65%",
              right: "12%",
              fontSize: "14px",
              opacity: 0.25,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "30%",
              fontSize: "10px",
              opacity: 0.2,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "35%",
              fontSize: "18px",
              opacity: 0.15,
            }}
          >
            ✦
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        {isAuthenticated && <Navbar />}
        <main className="mx-auto max-w-6xl p-4">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mood-logger"
              element={
                <ProtectedRoute>
                  <MoodLogger />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journey"
              element={
                <ProtectedRoute>
                  <Journey />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tips"
              element={
                <ProtectedRoute>
                  <Tips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/breathe"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Breathe />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/helplines"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Helplines />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
