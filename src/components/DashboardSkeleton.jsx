import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen animate-pulse">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4 space-y-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-neutral-100">
        {/* Chat Header */}
        <div className="h-14 bg-white border-b px-6 flex items-center">
          <div className="h-6 w-40 bg-gray-200 rounded" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`max-w-xs ${
                i % 2 === 0 ? "ml-auto" : "mr-auto"
              } bg-gray-200 p-3 rounded-2xl`}
            >
              <div className="h-4 w-32 bg-gray-300 rounded mb-1" />
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="h-16 bg-white border-t flex items-center px-4 gap-2">
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
          <div className="flex-1 h-10 bg-gray-200 rounded" />
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
