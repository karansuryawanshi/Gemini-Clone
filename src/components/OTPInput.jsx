const OTPInput = ({ otp, setOTP, darkMode }) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          darkMode ? "text-neutral-300" : "text-gray-700"
        }`}
      >
        Enter OTP
      </label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter 4-digit OTP (try 1234)"
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
          darkMode
            ? "bg-neutral-700 border-neutral-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
    </div>
  );
};

export default OTPInput;
