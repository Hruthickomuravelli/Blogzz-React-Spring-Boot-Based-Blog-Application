import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authorimg from "../../assets/authorimg.svg";
import { toast, ToastContainer, Zoom } from "react-toastify";

const AuthorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      import("react-toastify/dist/ReactToastify.css");
    } catch (e) {
      console.error("Failed to load React Toastify CSS:", e);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    const apiUrlForAuthor = "http://localhost:8080/author/login";

    try {
      const response = await axios.post(apiUrlForAuthor, { email, password });
      const loggedInAuthor = response.data;

      if (loggedInAuthor && loggedInAuthor.id) {
        localStorage.setItem("loggedInAuthorId", loggedInAuthor.id);
        localStorage.setItem("loggedInAuthorName", loggedInAuthor.name);

        toast.success("Logged in as Author..!", {
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
        console.log(
          "Author login successful ..! Author:",
          loggedInAuthor
        );

        setTimeout(() => {
          navigate("/authordashboard");
        }, 2000);
      } else {
        toast.error("Login failed: Unexpected response from server.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        setLoginError("Login failed: Unexpected response from server.");
      }
    } catch (err) {
      console.error("Author login failed:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const errorMessage = err.response.data || err.response.statusText;
          toast.error(`Login failed: ${errorMessage}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
          setLoginError(`Login failed: ${errorMessage}`);
        } else if (err.request) {
          toast.error(
            "Login failed: No response from server. Ensure your backend is running.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Zoom,
            }
          );
          setLoginError(
            "Login failed: No response from server. Ensure your backend is running."
          );
        } else {
          toast.error(`Login failed: ${err.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
          setLoginError(`Login failed: ${err.message}`);
        }
      } else {
        toast.error(
          "An unexpected error occurred during login. Please try again.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          }
        );
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
            src={authorimg}
            alt="Author Illustration"
            className="max-w-[80%] max-h-[80%] object-contain rounded-lg"
          />
        </div>

        <div className="w-1/2 flex justify-center items-center bg-white">
          <div className="shadow-2xl rounded-3xl px-12 py-10 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
              Author Login
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
                  placeholder="Enter your password"
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
                {loggingIn ? "Logging In..." : "Log In as Author"}
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

export default AuthorLogin;
