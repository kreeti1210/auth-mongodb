import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
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

        <div className="md:w-1/3 pt-20 bg-green-50 p-8 rounded-b-lg md:rounded-bl-none md:rounded-r-lg">
          <h2 className="text-lg text-center text-gray-600 mb-4">
            Login to continue
          </h2>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center bg-white outline shadow-md text-green-700 py-2 px-4 rounded hover:bg-green-700 hover:text-white">
              Google{" "}
              <img src="\src\assets\google.jpg" alt="" className="w-6 ml-2" />
            </button>
            <button className="w-full flex items-center justify-center bg-white outline shadow-md text-green-700 py-2 px-4 rounded hover:bg-green-800 hover:text-white">
              GitHub
              <span>
                <img src="\src\assets\github.svg" alt="" className="w-6 ml-2" />
              </span>
            </button>
            <div className="border-t border-green-300 "></div>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white  border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              className="w-full bg-green-600 text-white py-2 rounded mt-1 hover:bg-green-700"
              onClick={() => { navigate("/home") }}
            >
              Log In
            </button>
            <a
              href="/forgotPassword"
              className="text-green-700 px-1   text-sm hover:underline text-center font-semibold block"
            >
              Forgot Password? Click here!
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-600 text-center">
            New here?{" "}
            <a
              href="/register"
              className="text-green-700 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login