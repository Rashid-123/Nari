// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../store/auth";
// import BottomWarning from "./BottomWarning";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// function RegisterForm() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     userName: "",
//   });

//   const navigate = useNavigate();
//   const { storeTokenInLS } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     try {
//       const response = await fetch(`${backendUrl}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       console.log(response);

//       if (response.ok) {
//         const res_data = await response.json();
//         console.log("response from server : ", res_data);

//         storeTokenInLS(res_data.token);
//         // localStorage.setItem('token', res_data.token);

//         setFormData({
//           email: "",
//           password: "",
//           userName: "",
//         });

//         navigate("/");
//       }

//       // const data = await response.json();
//       console.log("Registration successful:", response);
//     } catch (error) {
//       console.error("Error registering:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-8 mt-60 sm:mt-100 lg:mt-8  rounded-lg shadow-lg w-full max-w-2xl -z-0">
//       <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
//         Register
//       </h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-purple-300 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-purple-300 mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             placeholder="Create a password"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-purple-300 mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             name="userName"
//             value={formData.userName}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             placeholder="Choose a username"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-purple-500 text-white py-2 rounded-lg font-bold hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-400"
//         >
//           Register
//         </button>

//         <BottomWarning
//           to={"/login"}
//           label={"Already have an account?"}
//           ButtonText={"Login"}
//         />
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import BottomWarning from "./BottomWarning";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    emergency_contact: "",
  });

  const [otp, setOtp] = useState(""); // OTP input state
  const [otpSent, setOtpSent] = useState(false); // To track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // To track OTP verification
  const [loading, setLoading] = useState(false); // Loading state for OTP request
  const [error, setError] = useState(""); // Error state for OTP

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${backendUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const resData = await response.json();
      if (response.ok) {
        setOtpSent(true);
      } else {
        setError(resData.message || "Failed to send OTP.");
      }
    } catch (error) {
      setError("Error sending OTP.", error);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError("");
    try {
      const response = await fetch(`${backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const resData = await response.json();
      if (response.ok) {
        setOtpVerified(true);
      } else {
        setError(resData.message || "Invalid OTP.");
      }
    } catch (error) {
      setError("Error verifying OTP.", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError("Please verify your OTP before registration.");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const resData = await response.json();
        storeTokenInLS(resData.token);

        setFormData({
          email: "",
          password: "",
          userName: "",
          emergency_contact: "",
        });

        navigate("/");
      } else {
        setError("Registration failed.");
      }
    } catch (error) {
      setError("Error registering user.", error);
    }
  };

  return (
    <div className="bg-gray-800 p-8 mt-20 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
        Register
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Email
          </label>
          <div className="flex">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              required
              disabled={otpSent}
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className={`px-4 bg-purple-500 text-white font-bold rounded-r-lg ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading || otpSent}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </div>

        {otpSent && !otpVerified && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Enter OTP
            </label>
            <div className="flex">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-4 bg-green-500 text-white font-bold rounded-r-lg"
              >
                Confirm OTP
              </button>
            </div>
          </div>
        )}

        {otpVerified && (
          <p className="text-green-500 text-center">OTP Verified ✔</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Emergency Contact
          </label>
          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter emergency contact number"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-purple-500 text-white py-2 rounded-lg font-bold ${
            !otpVerified
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-600"
          }`}
          disabled={!otpVerified}
        >
          Register
        </button>

        <BottomWarning
          to={"/login"}
          label={"Already have an account?"}
          ButtonText={"Login"}
        />
      </form>
    </div>
  );
}

export default RegisterForm;
