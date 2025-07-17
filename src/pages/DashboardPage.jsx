import { useApp } from "../Context/AppContext";
import { useState, useEffect, lazy } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { darkMode, setDarkMode, showToast, setCurrentRoute } = useApp();
  const [chatrooms, setChatrooms] = useState([
    {
      id: 1,
      title: "General Chat",
      lastMessage: "Hello! How can I help you today?",
      timestamp: new Date(),
    },
    {
      id: 2,
      title: "AI Assistant",
      lastMessage: "I can help you with various tasks...",
      timestamp: new Date(),
    },
  ]);
  const [activeChatroom, setActiveChatroom] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      chatroomId: 1,
      text: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
    {
      id: 2,
      chatroomId: 2,
      text: "I can help you with various tasks...",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const savedChatrooms = localStorage.getItem("gemini-chatrooms");
    const savedMessages = localStorage.getItem("gemini-messages");
    if (savedChatrooms) setChatrooms(JSON.parse(savedChatrooms));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem("gemini-chatrooms", JSON.stringify(chatrooms));
    localStorage.setItem("gemini-messages", JSON.stringify(messages));
  }, [chatrooms, messages]);

  const handleLogout = () => {
    localStorage.removeItem("gemini-auth");
    setCurrentRoute("login");
    toast.success("Logged out successfully");
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      chatroomId: activeChatroom,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        chatroomId: activeChatroom,
        text: generateAIResponse(text),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSendImage = (imageData) => {
    const newMessage = {
      id: Date.now(),
      chatroomId: activeChatroom,
      image: imageData,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    toast.success("Image sent");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        chatroomId: activeChatroom,
        text: "Nice image!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleImageUpload = (imageData) => {
    const imageMessage = {
      id: Date.now(),
      chatroomId: activeChatroom,
      image: imageData,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, imageMessage]);
    toast.success("Image uploaded successfully");
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective...",
      "Great point! I can help you with that.",
      "Thanks for sharing that with me. Here's what I think...",
      "I appreciate you asking. Let me provide some insight...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const createChatroom = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (!newTitle.trim()) return;

    const newChatroom = {
      id: Date.now(),
      title: newTitle.trim(),
      lastMessage: "New chatroom created",
      timestamp: new Date(),
    };

    setChatrooms((prev) => [...prev, newChatroom]);
    toast.success("Chatroom created successfully");
    setNewTitle("");
    setIsModalOpen(false);
  };

  const deleteChatroom = (id) => {
    if (chatrooms.length <= 1) {
      toast.error("Cannot delete the last chatroom", "error");
      return;
    }

    if (confirm("Are you sure you want to delete this chatroom?")) {
      setChatrooms((prev) => prev.filter((room) => room.id !== id));
      setMessages((prev) => prev.filter((msg) => msg.chatroomId !== id));
      if (activeChatroom === id) {
        setActiveChatroom(chatrooms.find((room) => room.id !== id)?.id || 1);
      }
      toast.success("Chatroom deleted successfully");
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-neutral-800" : "bg-gray-50"}`}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        title="Dashboard"
      />

      <div className="flex h-screen">
        <Sidebar
          chatrooms={chatrooms}
          activeChatroom={activeChatroom}
          setActiveChatroom={setActiveChatroom}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateChatroom={createChatroom}
          onDeleteChatroom={deleteChatroom}
          darkMode={darkMode}
        />

        <ChatInterface
          chatrooms={chatrooms}
          activeChatroom={activeChatroom}
          messages={messages}
          onSendMessage={handleSendMessage}
          onSendImage={handleSendImage}
          // onImageUpload={handleImageUpload}
          isTyping={isTyping}
          darkMode={darkMode}
        />

        {isModalOpen && (
          <div className="z-[9999] backdrop-blur-xs fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-80 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Create Chatroom
              </h2>
              <input
                type="text"
                placeholder="Enter chatroom title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded mb-4 dark:bg-neutral-700 dark:text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSubmit}
                  className="px-4 py-2 bg-neutral-900 text-white rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
