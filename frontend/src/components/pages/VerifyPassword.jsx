import React from 'react'

const VerifyPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="outine-1 outline-gray-300 shadow-lg flex flex-col md:flex-col p-8 md:w-1/3 max-w-6xl">
        <h2 className="text-2xl text-center font-semibold text-gray-600 mb-2">
          Verify Token
        </h2>
        <div className="px-4 py-2 flex flex-col ">
        <input
          type="token"
          placeholder="Enter your Token"
          className="w-full px-4 py-2 mt-1 bg-white border rounded border-green-700 focus:outline-none focus:ring-2  focus:ring-green-600"
        />
        <button className="w-full flex items-center mt-4 justify-center bg-green-700 outline shadow-md text-white py-2 px-4 rounded hover:bg-green-900 hover:text-white">
          Verify
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