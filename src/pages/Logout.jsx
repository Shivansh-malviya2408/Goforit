import { LogOutIcon } from 'lucide-react';
import React from 'react'

const Logout = () => {

    function onLogout()
    {
        localStorage.removeItem('token'); // Remove
        window.location.href = '/'; // Redirect to login page
    }   


  return (
    <div className="absolute bottom-0 left-0 w-full p-6">
        
        <button style={{position:'relative',right:"1vw" }}
          onClick={()=>onLogout()} // Use the onLogout prop
          className="w-full flex items-center justify-start space-x-3 px-4 py-3  rounded-xl transition-all duration-200 text-red-400 bg-gray-900 hover:bg-red-800/20 hover:text-red-300 border border-red-900/50"
        >
          {/* <LogOut className="w-5 h-5 text-red-500" /> */}
          <LogOutIcon/>
          <span className="font-semibold">Log Out</span>
        </button>
     </div>
  )
}


export default Logout;