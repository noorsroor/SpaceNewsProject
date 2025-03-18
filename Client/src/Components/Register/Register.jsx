import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown, Check } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    preferences: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const navigate = useNavigate();

  const interestOptions = [
    { id: 1, value: "The Solar System", label: "The Solar System" },
    {
      id: 2,
      value: "Astrobiology & Alien Life",
      label: "Astrobiology & Alien Life",
    },
    {
      id: 3,
      value: "Astronomy & Space Science",
      label: "Astronomy & Space Science",
    },
    {
      id: 4,
      value: "Space Technology & Innovation",
      label: "Space Technology & Innovation",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePreference = (value) => {
    setFormData((prev) => {
      const preferences = prev.preferences.includes(value)
        ? prev.preferences.filter((pref) => pref !== value)
        : [...prev.preferences, value];
      return { ...prev, preferences };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          preferences: formData.preferences,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Registration failed");
        return;
      }
      const result = await response.json();
      dispatch(setUserId(result.user.id));
      setSuccess("Registration successful! Redirecting to home page...");

      const token = result.token;
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      document.cookie = `token=${token};expires=${expires.toUTCString()};path=/;secure`;

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-[#F1F1F1] overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-2/5 relative">
        <div className="absolute inset-0 bg-black opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/9423870/pexels-photo-9423870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative h-full flex flex-col justify-between p-8 text-[#F1F1F1]">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#FDB827] rounded-full flex items-center justify-center">
              <span className="text-[#23120B] font-bold text-lg"></span>
            </div>
            <span className="ml-2 font-semibold text-lg">ORBITRA</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Discover the <span className="text-[#FDB827]">wonders</span>
            <br />
            of the cosmos
          </h2>
          <p className="mb-4 text-[#F1F1F1]/80 text-sm leading-relaxed">
            Join our community of space enthusiasts and embark on a journey
            through the universe.
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-8 h-1 bg-[#FDB827]"></div>
            <p className="text-xs text-[#F1F1F1]/70">
              Over 10,000 explorers already joined
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-3/5 flex flex-col p-4 md:p-0">
        <div className="max-w-md mx-auto w-full px-4 md:px-0 flex flex-col justify-center h-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2 text-[#23120B]">
              Create your account
            </h1>
            <p className="text-xs text-[#23120B]/70">
              Begin your cosmic journey with ExploreMe
            </p>
          </div>

          {error && (
            <div
              className="p-3 mb-4 text-xs text-[#23120B] bg-red-100 rounded-lg border-l-4 border-red-500"
              role="alert"
            >
              <p className="font-medium">Registration Error</p>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              className="p-3 mb-4 text-xs text-[#23120B] bg-green-100 rounded-lg border-l-4 border-green-500"
              role="alert"
            >
              <p className="font-medium">Success!</p>
              <p>{success}</p>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-[#23120B]/80 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#23120B]/80 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#23120B]/80 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-[#23120B]/60 hover:text-[#23120B] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-[#23120B]/60">
                Password must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23120B]/80 mb-1">
                Select your interests
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#21209C] text-sm"
                  onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                >
                  <span className="text-left truncate text-[#23120B]/80">
                    {formData.preferences.length > 0
                      ? `${formData.preferences.length} selected`
                      : "Select your interests"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform text-[#23120B]/60 ${
                      isPreferencesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isPreferencesOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-[#23120B]/20 rounded-lg shadow-lg max-h-32 overflow-auto">
                    {interestOptions.map((option) => (
                      <div
                        key={option.id}
                        className="px-3 py-2 hover:bg-[#F1F1F1] cursor-pointer flex items-center space-x-2 text-sm"
                        onClick={() => togglePreference(option.value)}
                      >
                        <div
                          className={`h-4 w-4 border rounded flex items-center justify-center ${
                            formData.preferences.includes(option.value)
                              ? "bg-[#21209C] border-[#21209C]"
                              : "border-[#23120B]/30"
                          }`}
                        >
                          {formData.preferences.includes(option.value) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="text-[#23120B]/80">
                          {option.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.preferences.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.preferences.map((pref) => (
                    <span
                      key={pref}
                      className="inline-flex items-center bg-[#21209C]/10 text-[#21209C] text-xs px-2 py-0.5 rounded-full"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 text-white font-medium rounded-lg transition duration-200 bg-[#FDB827] hover:bg-[#F26B0F]/90 focus:ring-4 focus:ring-[#21209C]/30 text-sm"
              >
                Create Account
              </button>
            </div>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#23120B]/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#F1F1F1] text-[#23120B]/60">
                  Or continue with
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="w-full py-2.5 border border-[#23120B]/20 rounded-lg flex items-center justify-center space-x-2 font-medium hover:bg-white transition-colors bg-white text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 18 18">
                  <path
                    fill="#4285F4"
                    d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
                  />
                  <path
                    fill="#34A853"
                    d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
                  />
                  <path
                    fill="#EA4335"
                    d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.8 4.8 0 014.48-3.3z"
                  />
                </svg>
                <span className="text-[#23120B]/80">Sign up with Google</span>
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <p className="text-xs text-[#23120B]/70">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="font-medium text-[#21209C] hover:text-[#21209C]/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
