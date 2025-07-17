import { MessageCircle, Moon, Star } from "lucide-react";
import { LogOut, Sun } from "lucide-react";

const Header = ({
  darkMode,
  setDarkMode,
  onLogout,
  showBackButton,
  onBack,
  title,
}) => {
  return (
    <header
      className={`border-b ${
        darkMode
          ? "bg-neutral-900 border-neutral-900"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex dark:bg-neutral-800/50 rounded-lg items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Star
            className={`w-6 h-6 ${
              darkMode
                ? "text-orange-500 fill-orange-400"
                : "text-orange-500 fill-orange-400"
            }`}
          />
          <h1
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title || "Gemini Chat"}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-neutral-700 text-neutral-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
