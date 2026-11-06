import {
  faInstagram,
  faTwitter,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

import {
  faBars,
  faXmark,
  faUser
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
import {routerContext} from '../../context/RouterGuardContext'
import { useContext } from 'react'

function UserHeader() {

  const [listStatus, setListStatus] = useState(false)
  const[token,setToken]=useState("")
  const[userDp,setUserDp]=useState("")
  const[userId,setUserID]=useState("")
    const {setRole,setAuthorizedUser}=useContext(routerContext)
  
  const [dropDwn,setDrpDwn]=useState(false)
  const navigate=useNavigate()
useEffect(()=>{
  if(sessionStorage.getItem("user")&& sessionStorage.getItem("token")){
    const userToken=sessionStorage.getItem("token")
    const user=JSON.parse(sessionStorage.getItem("user"))
    
    setToken(userToken)
    setUserDp(user.picture)
    setUserID(user._id)
  }
},[token])
const logout=()=>{
  sessionStorage.clear()
  setAuthorizedUser(false)
  setToken("")
  setUserDp("")
  setUserID("")
  navigate('/login')
}
  return (
    <>
      {/* ================= WHITE HEADER ================= */}
      <div className="bg-white grid grid-cols-3 items-center px-3 md:px-5 py-2">

        {/* LEFT - LOGO */}
        <div className="flex items-center">

          <img
            src="https://img.magnific.com/premium-vector/vector-illustration-book-transparent-background_841845-430.jpg"
            alt="Book Store"
            className="w-8 h-8 md:w-9 md:h-9"
          />

        </div>


        {/* CENTER - BOOK STORE */}
        <div className="text-center">

          <h1 className="text-sm md:text-xl font-bold text-black">
            BOOK STORE
          </h1>

        </div>


        {/* RIGHT - SOCIAL ICONS */}
        <div className="flex justify-end items-center">

          <div className="hidden md:flex items-center gap-4 text-black">

            <FontAwesomeIcon icon={faInstagram} />

            <FontAwesomeIcon icon={faTwitter} />

            <FontAwesomeIcon icon={faFacebook} />
            


                  {
         !token? <Link to={'/login'} className='!ms-5 border border-black rounded !py-2 !px-3'><FontAwesomeIcon icon={faUser} />Login</Link>
         :
         <div className='relative'>
          {/* profile */}
          <button onClick={()=>setDrpDwn(!dropDwn)} className='shadow-sm !ms-4 rounded !p-1'>
            <img className="w-10 h-10 rounded-full object-cover"src= {userDp==""?'https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg':userDp?.startsWith ('https://lh3.googleusercontent.com')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`}  alt="" />
          </button>
          {/* dropdown */}
          {dropDwn && (
  <div className="absolute right-0 top-full !mt-2 z-50 w-40 rounded !p-2 bg-white text-black shadow ring">
    <Link
      to={`/profile/${userId}`}
      onClick={() => setDrpDwn(false)}
      className="block p-2"
    >
      Profile
    </Link>

    <button onClick={logout} className="p-2 block cursor-pointer">Logout</button>
  </div>
)}
         </div>
         }

          

          </div>

        </div>

      </div>


      {/* ================= BLACK NAVBAR ================= */}
      <nav className="bg-blue-950 text-white relative">

        {/* MOBILE NAVBAR */}
        <div className="md:hidden h-10 flex items-center justify-between px-4">

          {/* MENU ICON */}
          <button
            onClick={() => setListStatus(!listStatus)}
            className="text-white text-base"
          >
            <FontAwesomeIcon
              icon={listStatus ? faXmark : faBars}
            />
          </button>

   {
         !token? <Link to={'/login'} className='!ms-5 border border-black rounded !py-2 !px-3'><FontAwesomeIcon icon={faUser} />Login</Link>
         :
         <div className='relative'>
          {/* profile */}
          <button onClick={()=>setDrpDwn(!dropDwn)} className='shadow-sm !ms-4 rounded !p-1'>
            <img className="w-10 h-10 rounded-full object-cover" src= {userDp==""?'https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg':userDp?.startsWith ('https://lh3.googleusercontent.com')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`}  alt="" />
          </button>
          {/* dropdown */}
          {dropDwn && (
  <div className="absolute right-0 top-full !mt-2 z-50 w-40 rounded !p-2 bg-white text-black shadow ring">
    <Link
      to={`/profile/${userId}`}
      onClick={() => setDrpDwn(false)}
      className="block !p-2"
    >
      Profile
    </Link>

    <button onClick={logout} className="!p-2 block cursor-pointer">Logout</button>
  </div>
)}
         </div>
         }

         
         

        </div>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden md:flex justify-center items-center  gap-6 h-10">

          <Link
            to="/"
            className="text-sm hover:text-gray-300"
          >
            Home
          </Link>

          <Link
            to="/all-books"
            className="text-sm hover:text-gray-300"
          >
            Books
          </Link>

        

          <Link
            to="/contact"
            className="text-sm hover:text-gray-300"
          >
            Contact
          </Link>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {listStatus && (

          <div className="md:hidden bg-black border-t border-gray-700 flex flex-col text-center">

            <Link
              to="/"
              onClick={() => setListStatus(false)}
              className="px-5 py-2 text-sm hover:bg-gray-800 "
            >
              Home
            </Link>

            <Link
              to="/all-books"
              onClick={() => setListStatus(false)}
              className="px-5 py-2 text-sm hover:bg-gray-800"
            >
              Books
            </Link>

           

            <Link
              to="/contact"
              onClick={() => setListStatus(false)}
              className="px-5 py-2 text-sm hover:bg-gray-800"
            >
              Contact
            </Link>

          </div>

        )}

      </nav>

    </>
  )
}

export default UserHeader