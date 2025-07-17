import { useApp } from "../Context/AppContext";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { MessageCircle, Star } from "lucide-react";
import CountrySelector from "../components/CountrySelector";
import PhoneInput from "../components/PhoneInput";
import OTPInput from "../components/OTPInput";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { darkMode, setDarkMode, showToast, setCurrentRoute } = useApp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    dial_code: "+1",
    name: "United States",
  });
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [countries, setCountries] = useState();

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      toast.success("Please enter a phone number", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOTPInput(true);
      toast.success("OTP sent successfully!");
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "1234") {
        localStorage.setItem("gemini-auth", "true");
        setCurrentRoute("dashboard");
        toast.success("Welcome to Gemini Chat!");
      } else {
        toast.error("Invalid OTP. Try 1234", "error");
      }
    }, 1000);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data", data);
        const countryList = data
          .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
          .map((c) => ({
            name: c.name.common,
            code: c.idd.root + c.idd.suffixes[0],
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        console.log("[login]", countries);
        // console.log("[countryList]", countryList);
        setCountries(countryList);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  return (
    <div
      className={`min-h-screen block md:flex items-center justify-center ${
        darkMode ? "bg-neutral-900" : "bg-gray-50"
      }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} title="Login" />

      <div
        className={`w-auto md:max-w-md mx-4 p-8 rounded-2xl shadow-2xl ${
          darkMode ? "bg-neutral-800" : "bg-white"
        }`}
      >
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode ? "bg-neutral-900" : "bg-neutral-100"
            }`}
          >
            <Star className="w-8 h-8 text-orange-500 fill-orange-400" />
          </div>
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to Gemini Chat
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Sign in with your phone number
          </p>
        </div>

        {!showOTPInput ? (
          <div className="space-y-4">
            <CountrySelector
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              darkMode={darkMode}
            />
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              darkMode={darkMode}
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-2 px-4 rounded-lg hover:bg-neutral-900/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <OTPInput otp={otp} setOTP={setOTP} darkMode={darkMode} />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setShowOTPInput(false)}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                darkMode
                  ? "bg-neutral-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
