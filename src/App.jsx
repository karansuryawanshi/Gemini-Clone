import { useState, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
// import LoginPage from "./pages/LoginPage";
// import DashboardPage from "";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import LoginSkeleton from "./components/LoginSkeleton";
import DashboardSkeleton from "./components/DashboardSkeleton";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("login");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("gemini-auth");
    const savedDarkMode = localStorage.getItem("gemini-darkmode");

    if (savedAuth) setCurrentRoute("dashboard");
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("gemini-darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const contextValue = {
    currentRoute,
    setCurrentRoute,
    darkMode,
    setDarkMode,
    showToast,
    removeToast,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`${darkMode ? "dark" : ""}`}>
        {currentRoute === "login" && (
          <>
            <Suspense fallback={<LoginSkeleton></LoginSkeleton>}>
              <LoginPage />
            </Suspense>
          </>
        )}
        {currentRoute === "dashboard" && (
          <>
            <Suspense fallback={<DashboardSkeleton></DashboardSkeleton>}>
              <DashboardPage />
            </Suspense>
          </>
        )}

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
