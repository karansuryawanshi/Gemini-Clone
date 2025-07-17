import toast from "react-hot-toast";

const CreateChatroom = () => {
  const title = prompt("Enter chatroom title:");
  if (!title) return;

  const newChatroom = {
    id: Date.now(),
    title,
    lastMessage: "New chatroom created",
    timestamp: new Date(),
  };

  setChatrooms((prev) => [...prev, newChatroom]);
  toast.success("Chatroom created successfully");
  // alert("C hatroom created");
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
  <div className={`min-h-screen ${darkMode ? "bg-neutral-900" : "bg-gray-50"}`}>
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
        onImageUpload={handleImageUpload}
        isTyping={isTyping}
        darkMode={darkMode}
      />
    </div>
  </div>
);

export default CreateChatroom;
