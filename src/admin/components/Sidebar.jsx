import { faBook, faGear, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'

function Sidebar() {
   const [dp, setDp] = useState("")
    const [userName, setUserName] = useState("")
  useEffect(()=>{
     if (sessionStorage.getItem("user")) {
      let user = JSON.parse(sessionStorage.getItem("user"))
      setUserName(user.username)
      setDp(user.picture)
      
    }
  },[])
  return (
    <div className="h-full min-h-[calc(100vh-62px)] flex items-center justify-start !p-5 flex-col bg-blue-300">

      <img
        src={ dp==""
                  ? "https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
                  : dp?.startsWith('https://lh3.googleusercontent.com')
                    ? dp
                    :`${axiosInstance.defaults.baseURL}/uploads/${dp}`}
        height="100px"
        width="100px"
        style={{ borderRadius: '50%' }}
        alt=""
      />

      <h1 className="text-xl !mt-4 font-bold">
        {userName}
      </h1>

      <div className="!mt-7 flex items-center justify-center !p-5 flex-col">

        <Link
          to="/admin-dashboard"
          className="font-bold text-xl !my-2"
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>

        <Link
          to="/admin-resource"
          className="font-bold text-xl !my-2"
        >
          <FontAwesomeIcon icon={faBook} /> All Books
        </Link>

        <Link
          to="/admin-settings"
          className="font-bold text-xl !my-2"
        >
          <FontAwesomeIcon icon={faGear} /> Settings
        </Link>

      </div>

    </div>
  )
}

export default Sidebar