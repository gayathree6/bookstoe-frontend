import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../context/RouterGuardContext'
import { useContext } from 'react'

function Pnf() {
    const {role,authorizedUser}=useContext(routerContext)
    const navigate=useNavigate()
  const backtoHome=()=>{
    if(role=='user'){
        navigate('/')
    }else{
  navigate('admin-dashboard')
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#C0AD81] text-center">

      {/* GIF */}
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG9xM2p3NWV5YThqaTUxYjJtNmx2YTl1Y3hzZGZoNzd3ZmxjMHdnbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT77Y1T0zY1gR5qe5O/giphy.gif"
        alt="Page Not Found"
        className="w-[400px] h-auto"
      />

      {/* TEXT */}
      <h1 className="text-4xl font-bold !mt-5">
        Page Not Found
      </h1>

      <p className="text-gray-600 !mt-3">
        Sorry, the page you are looking for doesn't exist.
      </p>

      {/* BUTTON */}
    {
      authorizedUser?
      <button onClick={backtoHome}  className="!mt-6 bg-blue-900 text-white !px-6 !py-2 rounded-md hover:bg-blue-800">Back to Home</button>
      :
    
    <Link
        to={"/"}
        className="!mt-6 bg-blue-900 text-white !px-6 !py-2 rounded-md hover:bg-blue-800"
      >
        Back to Home
      </Link>}

    </div>
  )
}

export default Pnf