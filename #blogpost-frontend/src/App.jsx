import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import UserLogin from "./Components/Authentication/UserLogin";
import UserRegistration from "./Components/Register/UserRegistration";
import UserDashboard from "./Components/Dashboard/UserDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import AuthorDashboard from "./Components/Dashboard/AuthorDashboard";
import AdminLogin from "./Components/Authentication/AdminLogin";
import AuthorLogin from "./Components/Authentication/AuthorLogin";
import { ToastContainer, Zoom } from "react-toastify";

const App = () => {
  // const [entity, setEntity] = useState('')

  // return (
  //   <>

  //       <Routes>
  //         <Route path="/" element={<UserLogin data = {setEntity}/>} />{" "}
  //         {/* Optional: default route */}
  //         <Route path="/login" element={<UserLogin />} />
  //         <Route path="/register" element={<UserRegistration />} />
  //         <Route
  //           path="*"
  //           element={
  //             <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-700">
  //               404 - Page Not Found
  //             </div>
  //           }
  //         />
  //       </Routes>

  //     <div>
  //       {/* <UserLogin /> */}
  //       {/* <UserRegistration /> */}
  //       {/* <UserDashboard /> */}
  //       {/* <AdminDashboard /> */}
  //       {/* <AuthorDashboard /> */}

  //       {entity === 'user' && <Link to="/userdashboard"></Link>}

  //     </div>
  //   </>
  // );

  const [entity, setEntity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (entity === "user") navigate("/userdashboard");
    else if (entity === "admin") navigate("/admindashboard");
    else if (entity === "author") navigate("/authordashboard");
  }, [entity, navigate]);

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
      <Routes>
        <Route path="/" element={<UserLogin data={setEntity} />} />
        <Route path="/login" element={<UserLogin data={setEntity} />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/authorlogin" element={<AuthorLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userdashboard" element={<UserDashboard clearEntity={() => setEntity("")} />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/authordashboard" element={<AuthorDashboard />} />
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-700">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
