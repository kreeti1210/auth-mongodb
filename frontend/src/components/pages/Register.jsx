import React from 'react'
import Login from './Login.jsx'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white rounded-lg  outline-1 outline-gray-300 shadow-lg flex flex-col md:flex-row w-full max-w-5xl">
        <div className="md:w-2/3 p-8 text-center align-center justify-center gap-8 md:text-left">
          <h1 className="text-5xl  mb-4">Auth-FullStack</h1>
          <p className="text-gray-700 align-middle">
            A Node.js authentication backend using Express.js and MongoDB that
            provides a foundational structure for handling user registration and
            login embedded with tailwindcss, making it ideal for integration
            into full-stack applications.
          </p>
          <img
            src="\src\assets\greenillu.svg"
            className="w-1/2 mt-8 ml-4 text-center justify-center align-middle"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 pt-20 bg-green-50 p-8 rounded-b-lg md:rounded-bl-none md:rounded-r-lg">
          <h2 className="text-lg text-center text-gray-600 mb-4">
            Signup to continue
          </h2>

          <div className="space-y-3">
            <input
              type="name"
              placeholder="Name"
              className="w-full px-4 py-2 bg-white border rounded border-green-300 focus:outline-none focus:ring-2  focus:ring-green-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white  border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              onClick={() => {}}
            >
              Signup
            </button>
            <div className="border-t border-green-300 my-4"></div>
            <button
              className="w-full text-green-600 bg-white outline shadow-md py-2 rounded hover:bg-green-700 hover:text-white"
              onClick={() => { navigate("/verify") }}
            >
              Verify yourself!
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-600 text-center">
          Have an account?{" "}
            <a href="/" className="text-green-700 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register