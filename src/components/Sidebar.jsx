import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { ArrowRightFromLine, ArrowLeftFromLine } from "lucide-react";
import { useState } from "react";

import ChatroomItem from "./ChatroomItem";

const Sidebar = ({
  chatrooms,
  activeChatroom,
  setActiveChatroom,
  searchTerm,
  setSearchTerm,
  onCreateChatroom,
  onDeleteChatroom,
  darkMode,
}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const filteredChatrooms = chatrooms.filter((room) =>
    room.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className={`z-[999] min-h-screen overflow-scroll scrollbar-hidden border-r transition-all ease-in-out duration-300
    ${
      toggleSidebar
        ? "fixed top-0 left-0 w-80 bg-amber-100 md:relative"
        : "w-15 md:w-80 relative"
    }
    ${
      darkMode
        ? "bg-neutral-900 border-neutral-800"
        : "bg-white border-gray-200"
    }`}
      >
        <div
          className={`${
            toggleSidebar ? "block" : "hidden"
          } md:block absolute p-4 w-full`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Chatrooms
            </h2>
            <button
              onClick={onCreateChatroom}
              className={`p-2 rounded-lg transition-colors flex gap-2 ${
                darkMode
                  ? "hover:bg-neutral-700 text-neutral-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Plus className="w-5 h-5" />
              <ArrowLeftFromLine
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleSidebar(!toggleSidebar);
                }}
                className="w-5 h-5 block md:hidden"
              />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />

            <input
              type="text"
              placeholder="Search chatrooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-neutral-700 border-neutral-600 text-white focus:ring-neutral-500 "
                  : "bg-blue-200 border-blue-200 text-gray-900 focus:ring-blue-500 "
              }`}
            />
          </div>

          {/* Chatroom list */}
          <div className="space-y-2">
            {filteredChatrooms.map((room) => (
              <ChatroomItem
                key={room.id}
                room={room}
                isActive={activeChatroom === room.id}
                onClick={() => setActiveChatroom(room.id)}
                onDelete={(e) => {
                  e.stopPropagation();
                  onDeleteChatroom(room.id);
                }}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
        {!toggleSidebar && (
          <div className="md:hidden z-100 flex items-center justify-center my-6 hover:bg-neutral-100 py-2 mx-2">
            <ArrowRightFromLine
              onClick={() => {
                console.log("clicked");
                setToggleSidebar(!toggleSidebar);
              }}
              className="w-6 h-6 text-neutral-300"
            ></ArrowRightFromLine>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
