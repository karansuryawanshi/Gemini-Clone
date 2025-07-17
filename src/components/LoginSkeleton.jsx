import React from "react";

const LoginSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-md w-full max-w-md space-y-6 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-neutral-200" />

        <div className="h-6 w-3/4 bg-neutral-200 rounded" />
        <div className="h-4 w-2/3 bg-neutral-200 rounded" />

        <div className="w-full space-y-4 mt-4">
          {/* Country Dropdown */}
          <div className="h-12 bg-neutral-200 rounded w-full" />

          {/* Phone Number Input */}
          <div className="flex gap-2">
            <div className="w-1/4 h-12 bg-neutral-200 rounded" />
            <div className="w-3/4 h-12 bg-neutral-200 rounded" />
          </div>

          {/* Button */}
          <div className="h-12 bg-neutral-300 rounded w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton;
