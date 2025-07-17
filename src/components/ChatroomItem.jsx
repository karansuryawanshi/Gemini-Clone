import { Trash2 } from "lucide-react";

const ChatroomItem = ({ room, isActive, onClick, onDelete, darkMode }) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
        isActive
          ? darkMode
            ? "bg-neutral-600/70"
            : "bg-blue-300/70"
          : darkMode
          ? "hover:bg-neutral-700/50"
          : "hover:bg-blue-200/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3
            className={`font-medium ${
              isActive
                ? darkMode
                  ? "text-white"
                  : "text-black"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {room.title}
          </h3>
          <p
            className={`text-sm truncate ${
              isActive
                ? darkMode
                  ? "text-white/50"
                  : "text-neutral-700"
                : darkMode
                ? "text-gray-400"
                : "text-neutral-700"
            }`}
          >
            {room.lastMessage}
          </p>
        </div>
        <button
          onClick={onDelete}
          className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
            darkMode
              ? "hover:bg-neutral-600 text-neutral-200"
              : "hover:bg-blue-200 text-red-400"
          }`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatroomItem;
