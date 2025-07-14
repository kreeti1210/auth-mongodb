import React from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";

const Home = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center   p-4">
        <h1 className="text-4xl text-center font-semibold text-gray-600 ">
          {" "}
          Welcome User
        </h1>
        <div className="px-8 py-2 flex flex-row md:w-1/3 gap-2">
          <button onClick={handleLogout} className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white">
            Logout
          </button>

          <button className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white" onClick={() => navigate("/resetPassword")}>
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
