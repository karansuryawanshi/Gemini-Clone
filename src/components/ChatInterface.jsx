import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { Upload, Send } from "lucide-react";
import { Star } from "lucide-react";
import imageCompression from "browser-image-compression";

const ChatInterface = ({
  chatrooms,
  activeChatroom,
  onSendImage,
  messages,
  onSendMessage,
  // onImageUpload,
  isTyping,
  darkMode,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    onSendMessage(currentMessage);
    setCurrentMessage("");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        onSendImage(e.target.result); // call parent to send image message
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const currentMessages = messages.filter(
    (msg) => msg.chatroomId === activeChatroom
  );
  const activeRoom = chatrooms.find((room) => room.id === activeChatroom);

  return (
    <div className="flex-1 flex flex-col">
      <div
        className={`p-4 w-auto border-b ${
          darkMode
            ? "bg-neutral-900 border-neutral-900"
            : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {activeRoom?.title || "Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onCopy={(text) => {
              navigator.clipboard.writeText(text);
            }}
            darkMode={darkMode}
          />
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-neutral-900 text-white" : "bg-blue-200"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="animate-pulse z-10 ">
                    <Star
                      width={25}
                      height={25}
                      className="text-orange-500 fill-orange-400"
                    />
                  </div>
                </div>

                <p
                  className={`animate-pulse ${
                    darkMode ? "text-neutral-200" : "text-neutral-900"
                  }`}
                >
                  Gemini is typing...
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <div
        className={`p-0 sm:p-4 border-t ${
          darkMode
            ? "bg-neutral-800 border-neutral-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-neutral-700 text-neutral-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
              darkMode
                ? "bg-neutral-900 border-neutral-900 text-white"
                : "bg-gray-50 border-gray-200 text-gray-900"
            }`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
            className="p-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
