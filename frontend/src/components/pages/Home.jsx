import React from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";

const Home = () => {
  const { logout,user } = useAuthStore();
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
          Welcome {user?.name}!
        </h1>
        <h3 className=" text-center mt-4 text-gray-600 ">
          {" "}
          I see you already utilised our authentication feature of registering,
          logging in and verifying your account.
          <br /> Here you can test your options to change password or logout.
          <br />
          It was pleasure meeting you!
        </h3>

        <img
          src="\src\assets\homepageicon.svg"
          className="w-1/3 mt-8 ml-4 text-center justify-center align-middle"
        />
        <div className="px-8 py-2 flex flex-row md:w-1/3 gap-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white"
          >
            Logout
          </button>

          <button
            className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white"
            onClick={() => navigate("/forgotPassword")}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
