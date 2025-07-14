import React from 'react'
import Login from './Login.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore.js';



const Register = () => {
  const { user,registerUser,onLoading } = useAuthStore();
  const navigate = useNavigate();
  const [form,setForm]= useState({name:"",email:"",password:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      console.log(user);
      navigate("/verify");
    } catch (error) {
      console.log(error);   
    }
  }

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
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded border-green-300 focus:outline-none focus:ring-2  focus:ring-green-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 bg-white  border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                type="submit"
                disabled={onLoading}
              >
                {onLoading ? "Loading..." : "Signup"}
              </button>
            </form>
            <div className="border-t border-green-300 my-4"></div>
            <button
              className="w-full text-green-600 bg-white outline shadow-md py-2 rounded hover:bg-green-700 hover:text-white"
              onClick={() => {
                navigate("/verify");
              }}
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