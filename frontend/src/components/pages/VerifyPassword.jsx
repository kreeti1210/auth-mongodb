import React, { useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore.js";

const VerifyPassword = () => {
  const [token,setToken]=useState("");
  const navigate = useNavigate();
  const{verifyUser,isVerified,user,isLoading} = useAuthStore();

  const handleVerify = async () => {
    try {
     const res= await verifyUser(token);
     console.log("at verify page:",isVerified);
     console.log(user);
     navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="outine-1 outline-gray-300 shadow-lg flex flex-col md:flex-col p-8 md:w-1/3 max-w-6xl">
        <h2 className="text-2xl text-center font-semibold text-gray-600 mb-1">
          Verify Token
        </h2>
        <h3 className=" px-4 py-2 text-center text-gray-500  text-sm ">
          Verification token has been sent to < a href="mailto:{user.email}" className="font-semibold">{user.email}</a>
          <p>Check your inbox for the token</p>
        </h3>

        <div className="px-4 py-2 flex flex-col ">
          <input
            type="token"
            placeholder="Enter your Token"
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-white border rounded border-green-700 focus:outline-none focus:ring-2  focus:ring-green-600"
          />
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white"
          >
            {isLoading ? "Loading" : "Verify "}
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          Once verified you will be redirected to login page
        </p>
        <p className="text-center text-gray-500 text-sm ">
          If not{" "}
          <a href="/" className="text-green-700 font-semibold underline">
            {" "}
            click here
          </a>
        </p>
      </div>
    </div>
  );
}

export default VerifyPassword