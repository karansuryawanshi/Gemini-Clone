const PhoneInput = ({
  phoneNumber,
  setPhoneNumber,
  selectedCountry,
  darkMode,
}) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          darkMode ? "text-neutral-300" : "text-gray-700"
        }`}
      >
        Phone Number
      </label>
      <div className="flex">
        <span
          className={`inline-flex items-center px-3 rounded-l-lg border border-r-0 ${
            darkMode
              ? "bg-neutral-700 border-neutral-600 text-gray-300"
              : "bg-gray-50 border-gray-300 text-gray-500"
          }`}
        >
          {selectedCountry.code}
        </span>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className={`flex-1 px-3 w-[50%] md:w-auto py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
            darkMode
              ? "bg-neutral-700 border-neutral-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
