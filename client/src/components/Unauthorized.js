import React from 'react'
import {  Link } from "react-router-dom"
const Unauthorized = () => {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row px-6 md:px-24  gap-16 lg:gap-28">
    
                <Link to="/login" ><button
                  className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Login
                </button>
                </Link>
              </div>
       )
}

export default Unauthorized