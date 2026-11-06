import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

import Sidebar from '../components/Sidebar'
import  { useRef } from "react";
function Settings() {

  const [username, setUsername] = useState('Bookstore Admin')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleReset = () => {
    setUsername('Bookstore Admin')
    setPassword('')
    setConfirmPassword('')
  }

  const handleUpdate = () => {
    console.log({
      username,
      password,
      confirmPassword
    })
  }
const fileInputRef = useRef(null);
const [profilePic, setProfilePic] = useState(
  "https://img.magnific.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg"
);

const handleProfilePicClick = () => {
  fileInputRef.current.click();
};

const handleProfilePicChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setProfilePic(URL.createObjectURL(file));
  }
};
  return (
    <>

      {/* ================= HEADER ================= */}
      <header className="h-[60px] bg-white flex items-center !px-5">

        <div className="flex items-center gap-2">

          <FontAwesomeIcon
            icon={faUser}
            className="text-3xl"
          />

          <h1 className="text-2xl font-bold">
            BOOKSTORE
          </h1>

        </div>

      </header>


      {/* ================= TOP BAR ================= */}
      <div className="h-[45px] bg-[#14245c] flex items-center justify-end !px-7">

        <p className="text-white text-sm">
          Welcome, Admin!⌄
        </p>

      </div>


      {/* ================= MAIN AREA ================= */}
      <div className="flex min-h-[calc(100vh-105px)]">


        {/* ================= SIDEBAR ================= */}
        <div className="w-[240px] shrink-0">

          <Sidebar />

        </div>


        {/* ================= SETTINGS AREA ================= */}
        <main className="flex-1 !px-10 !py-8">

          {/* SETTINGS HEADING */}
          <h2 className="text-3xl font-bold text-center !mb-8">
            Settings
          </h2>


          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1000px] mx-auto">


            {/* ================= LEFT TEXT ================= */}
            <div className="text-justify text-sm leading-6">

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo eligendi nisi possimus, perferendis nihil ipsam
                neque aspernatur rerum quam voluptatum, molestiae quibusdam.
                Amet itaque consequuntur dolor dignissimos accusamus, quod
                hicnam molestiae voluptatum, molestiae quibusdam.
                Amet itaque consequuntur dolor dignissimos accusamus.
              </p>

              <p className="!mt-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo eligendi nisi possimus, perferendis nihil ipsam
                neque aspernatur rerum quam voluptatum, molestiae quibusdam.
                Amet itaque consequuntur dolor dignissimos accusamus, quod
                hicnam molestiae voluptatum, molestiae quibusdam.
                Amet itaque consequuntur dolor dignissimos accusamus.
              </p>

            </div>


            {/* ================= SETTINGS CARD ================= */}
            <div className="bg-blue-100 rounded-lg !p-6">

              {/* PROFILE IMAGE */}
              <div className="flex justify-center !mb-6">

                <div className="relative">

                  <img
                    src="https://static.vecteezy.com/system/resources/previews/020/389/525/non_2x/hand-drawing-cartoon-girl-cute-girl-drawing-for-profile-picture-vector.jpg"
                    alt="Admin"
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />

                  {/* EDIT ICON */}
                  <button onClick={handleProfilePicClick}
                    className="
                      absolute
                      bottom-0
                      right-0
                      w-8
                      h-8
                      rounded-full
                      bg-yellow-400
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-white text-sm"
                    />

                  </button>

                </div>

              </div>
              <input
  type="file"
  ref={fileInputRef}
  accept="image/*"
  onChange={handleProfilePicChange}
  className="hidden"
/>


              {/* USERNAME */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full
                  h-[45px]
                  bg-white
                  rounded-md
                  !px-3
                  !mb-4
                  outline-none
                  border-none
                "
                placeholder="Username"
              />


              {/* PASSWORD */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  h-[45px]
                  bg-white
                  rounded-md
                  !px-3
                  !mb-4
                  outline-none
                  border-none
                "
                placeholder="Password"
              />


              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  w-full
                  h-[45px]
                  bg-white
                  rounded-md
                  !px-3
                  !mb-6
                  outline-none
                  border-none
                "
                placeholder="Confirm Password"
              />


              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={handleReset}
                  className="
                    flex-1
                    h-[45px]
                    bg-yellow-400
                    hover:bg-yellow-500
                    text-white
                    font-bold
                    rounded-md
                  "
                >
                  RESET
                </button>


                <button
                  onClick={handleUpdate}
                  className="
                    flex-1
                    h-[45px]
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-bold
                    rounded-md
                  "
                >
                  UPDATE
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </>
  )
}

export default Settings