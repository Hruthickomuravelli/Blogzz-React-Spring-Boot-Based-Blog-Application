import React, { useState } from "react";
import userimg from "../../assets/Userimg.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = ({ data }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    const apiUrlForLogin = "http://localhost:8080/userlogin";

    try {
      const response = await axios.post(apiUrlForLogin, { email, password });

      const loggedInUser = response.data;

      if (loggedInUser && loggedInUser.id) {
        console.log(
          "User login successful (server-side verified)! User:",
          loggedInUser
        );

        localStorage.setItem("loggedInUserId", loggedInUser.id);
        localStorage.setItem(
          "loggedInUserName",
          loggedInUser.name || loggedInUser.email
        );

        toast.success("Login Success..!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          onClose: () => {
            if (data) {
              data("user"); // only set entity after toast closes
            }
            setEmail("");
            setPassword("");
          },
        });
        setTimeout(() => {
          navigate("/userdashboard");
        }, 2000);
      } else {
        setLoginError("Login successful but unexpected response from server.");
      }
    } catch (err) {
      console.error("User login failed:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setLoginError(
            `Login failed: ${err.response.data || err.response.statusText}`
          );
        } else if (err.request) {
          setLoginError(
            "Login failed: No response from server. Please check your network connection and ensure the backend is running."
          );
        } else {
          setLoginError(`An unexpected error occurred: ${err.message}`);
        }
      } else {
        setLoginError(
          "An unexpected error occurred during login. Please try again."
        );
      }
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen gap-2 screen">
        <div className="w-1/2 bg-emerald-600 flex items-center justify-center">
          <img
            src={userimg}
            alt="Employee Illustration"
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>

        <div className="w-1/2 flex justify-center items-center bg-white">
          <div className="shadow-2xl rounded-3xl px-12 py-10 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-emerald-600 mb-6">
              User Login
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
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-emerald-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-emerald-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                              ? "bg-emerald-400 cursor-not-allowed"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                disabled={loggingIn}
              >
                {loggingIn ? "Logging In..." : "Log In"}
              </button>
              <div>
                <p className="text-sm text-gray-500 text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-emerald-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/authorlogin"
                    className="text-emerald-600 hover:underline ml-3"
                  >
                    Author Login
                  </Link>
                  <Link
                    to="/adminlogin"
                    className="text-emerald-600 hover:underline ml-3"
                  >
                    Admin Login
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

export default UserLogin;
