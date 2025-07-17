import { Copy } from "lucide-react";
import Typewriter from "./Typewriter";

const Message = ({ message, onCopy, darkMode }) => {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 group relative ${
          message.sender === "user"
            ? darkMode
              ? "bg-white/10 text-white rounded-3xl rounded-tr-none"
              : "bg-gray-200 text-black rounded-3xl rounded-tr-none"
            : darkMode
            ? "bg-neutral-900/90 text-white rounded-3xl rounded-tl-none"
            : " bg-blue-200/80 text-gray-900 rounded-3xl rounded-tl-none"
        }`}
      >
        {message.image && (
          <div className="overflow-hidden rounded-xl max-w-xs lg:max-w-md">
            <img
              src={message.image}
              alt="Uploaded"
              className="w-full h-auto rounded-xl object-cover shadow-md"
            />
          </div>
        )}

        {message.text && message.sender === "ai" ? (
          <Typewriter text={message.text} speed={25} />
        ) : (
          <>
            <p>{message.text}</p>
          </>
        )}

        {console.log(message)}

        <div>
          <p
            className={`text-xs mt-1 ${
              message.sender === "user"
                ? darkMode
                  ? "text-blue-100"
                  : "text-black/50"
                : darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
