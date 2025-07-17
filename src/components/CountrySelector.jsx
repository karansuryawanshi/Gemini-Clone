const CountrySelector = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  darkMode,
}) => {
  console.log("[countries]", countries);
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          darkMode ? "text-neutral-300" : "text-gray-700"
        }`}
      >
        Country
      </label>
      <select
        value={selectedCountry.code}
        onChange={(e) =>
          setSelectedCountry(countries.find((c) => c.code === e.target.value))
        }
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
          darkMode
            ? "bg-neutral-700 border-neutral-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        {countries?.map?.((country, index) => {
          // console.log(country);
          return (
            <option key={index} value={country?.code}>
              {country?.name} ({country?.code})
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountrySelector;
