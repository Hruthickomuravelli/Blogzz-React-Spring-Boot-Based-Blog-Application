import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast, Zoom } from 'react-toastify';

const UserRegistration = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [registering, setRegistering] = useState(false); 
  const [registerError, setRegisterError] = useState(null); 
  const [registerSuccess, setRegisterSuccess] = useState(false); 
  const navigate = useNavigate(); 

  const registerHandler = async (e) => {
    e.preventDefault();
    setRegistering(true); 
    setRegisterError(null); 
    setRegisterSuccess(false); 

    // Ensureing all fields are filled
    if (!name.trim() || !email.trim() || !password.trim()) {
      setRegisterError("All fields are required.");
      setRegistering(false);
      return;
    }

    const apiUrlForRegister = 'http://localhost:8080/user/register';

    try {
      
      const response = await axios.post(apiUrlForRegister, {
        name,
        email,
        password,
      });

      // Assuming a successful response (HTTP 201 Created) returns the registered user's data
      const registeredUser = response.data;
      console.log("User registered successfully:", registeredUser);
      
      setRegisterSuccess(true); 
      toast.success("Registration Success Redirecting to login..! ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
      
    } catch (err) {
      console.error('User registration failed:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          
          setRegisterError(`Registration failed: ${err.response.data || err.response.statusText}. Please try again.`);
        } else if (err.request) {
          
          setRegisterError('Registration failed: No response from server. Please check your network connection and ensure the backend is running.');
        } else {
         
          setRegisterError(`An unexpected error occurred: ${err.message}`);
        }
      } else {
        setRegisterError('An unexpected error occurred during registration. Please try again.');
      }
    } finally {
      setRegistering(false); 
      setName(''); 
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="shadow-2xl rounded-3xl px-12 py-10 w-full max-w-md bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          User Registration
        </h2>
        <form
          onSubmit={registerHandler}
          className="space-y-5"
        >
          
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required 
              disabled={registering} 
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required 
              disabled={registering} 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required 
              disabled={registering} 
            />
          </div>

         
          {registerError && (
            <p className="text-red-600 text-sm text-center">{registerError}</p>
          )}
          {registerSuccess && (
            <p className="text-green-600 text-sm text-center">Registration successful! Redirecting to login...</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg font-semibold text-lg shadow-md transition-colors duration-300
                        ${registering
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                        }`}
            disabled={registering} 
          >
            {registering ? 'Registering...' : 'Register'}
          </button>
          <div>
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;