import React, { useState } from "react";
import adminimg from "../../assets/adminimg.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (email === "admin@me.com" && password === "123") {
      toast.success("Logged in as Admin..!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });

      setTimeout(() => {
        navigate("/admindashboard");
      }, 2000);
    } else {
      setLoginError("Invalid email or password");
    }
    setLoggingIn(false);
  };

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <div className="flex h-screen w-screen gap-2">
        <div className="w-1/2 bg-green-600 flex items-center justify-center">
          <img
            src={adminimg}
            alt="Author Illustration"
            className="max-w-[80%] max-h-[80%] object-contain rounded-lg"
          />
        </div>

        <div className="w-1/2 flex justify-center items-center bg-white">
          <div className="shadow-2xl rounded-3xl px-12 py-10 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
              Admin Login
            </h2>
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-700 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email from your backend"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={loggingIn}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-gray-700 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter plain password from your backend"
                  className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={loggingIn}
                />
              </div>

              {loginError && (
                <p className="text-red-600 text-sm text-center">{loginError}</p>
              )}

              <button
                type="submit"
                className={`w-full py-3 text-white rounded-lg font-semibold text-lg shadow-md transition-colors duration-300
                          ${
                            loggingIn
                              ? "bg-green-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                disabled={loggingIn}
              >
                {loggingIn ? "Logging In..." : "Log In as Admin"}
              </button>
              <div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  <Link to="/login" className="text-gray-600 hover:underline">
                    Back to User Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
