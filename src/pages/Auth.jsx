import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { registerAPI, loginAPI, googleLoginAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {routerContext} from '../context/RouterGuardContext'
import { useContext } from 'react'
function Auth() {
  const {setRole,setAuthorizedUser}=useContext(routerContext)
const navigate = useNavigate()
 const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const formik=useFormik({
    initialValues:{
      username:"demo",
      email:"",
      password:""
    },
    validationSchema:Yup.object({
      username: isRegister
  ? Yup.string().min(3, "Must be at least 3 characters").required("Required")
  : Yup.string(),
      email:Yup.string().email("Invalid Email").required("Required"),
      password:Yup.string().required("Required")
    }),
    onSubmit:(values,{resetForm})=>{
      console.log(values);
      if(isRegister){
        console.log("Register api");
        handleRegister(values)
        
      }else{
        console.log("login api");
        handleLogin(values)
      }
      resetForm()
    }
  })
 const handleRegister = async (userData) => {
  try {
    const result = await registerAPI(userData)

    if (result.status == 200 || result.status == 201) {
      toast.success("Registration successful! Please login")
      setIsRegister(false)
    }
  } catch (error) {
    if (error.response?.status == 409) {
      toast.error("User already exists. Please login")
      setIsRegister(false)
    }
  }
}
const handleLogin = async (userData) => {
  loginAPI(userData).then((result) => {
    console.log(result)

    if (result.status == 200) {
      toast.success("Login Successful !!")
      
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorizedUser(true)

      if (result.data.user.role == 'admin') {
                setRole('admin')

        navigate('/admin-dashboard')
      } else {
        setTimeout(()=>{
        navigate('/')
        setRole('user')
      },2500)
      }
    }
  }).catch((error) => {
    if (error.response?.status == 409) {
      toast.error(error.response.data)
    }
  })
}
const handleGoogleLogin=async(credentialResponse)=>{
  console.log("inside google login");
  
     const {name,email,picture} =jwtDecode(credentialResponse.credential)
    console.log(name,email,picture);
const res=await googleLoginAPI({username:name,email,password:"googlepassword",picture})
  console.log(res);
   if (res.status == 200 ) {
      toast.success("Login Successfull")
      sessionStorage.setItem("user", JSON.stringify(res.data.user))
      sessionStorage.setItem("token", res.data.token)
      setAuthorizedUser(true)
      setTimeout(()=>{
        setRole('user')
        navigate('/')
      },2500)
    }
      
}
  return (

    <>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg)"
        }}
      >

        {/* ================= BOOK STORE ================= */}
        <h1 className="text-black font-bold text-2xl sm:text-3xl tracking-wide mt-10 z-20 !mt-23">
          BOOK STORE
        </h1>


        {/* ================= LOGIN / REGISTER CARD ================= */}
        <div
          className="
            absolute
            !top-[180px]
            sm:top-[80px]
            left-1/2
            -translate-x-1/2
            
            h-[400px]
            sm:w-[330px]
            bg-slate-900 shadow-2xl z-20
            px-4
            py-5
            text-white
            flex flex-col items-center
          "
        >

          {/* USER ICON */}
          <div className="flex justify-center mb-3">

            <div
              className="
                w-10
                h-10
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                !py-5
                !mt-5
              
              "
            >

              <FontAwesomeIcon
                icon={faUser}
                className="text-lg text-white"
              />

            </div>

          </div>


          {/* TITLE */}
          <h2 className="text-center text-[10px] !mb-6">
            {isRegister ? 'Register' : 'Login'}
          </h2>


          {/* ================= REGISTER USERNAME ================= */}
 <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
            {isRegister && (
  
             <div>
                <input onChange={formik.handleChange}
                name="username"
                  type="text"
                  placeholder="Username"
                  className="
                    w-[280px]
                    h-[30px]
                     !pl-3
                    
                    !px-2
                    text-[12px]
                    text-black
                    bg-white
                    outline-none
                   
                    
                  " value={formik.values.username}
                />
                <div className='text-yellow-400 !mb-2 !mt-0 text-[10px]'>{formik.errors.username}</div>
             </div>
             
            )}
  
  
            {/* ================= EMAIL ================= */}
            <div>
              <input onChange={formik.handleChange}
              name="email"
                type="email"
                placeholder="Email ID"
                className="
                  w-[280px]
                    h-[30px]
                     !pl-3
                    !mt-0
                  
                  px-2
                  text-[12px]
                  text-black
                  bg-white
                  outline-none
                "
                value={formik.values.email}
              />
              <div className='text-yellow-400 !mt-0 !mb-2 text-[10px]'>{formik.errors.email}</div>
            </div>
  
  
            {/* ================= PASSWORD ================= */}
            <div>
  <div className="relative">
    <input
      onChange={formik.handleChange}
      name="password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      className="w-[280px] h-[30px] !pl-3 text-[12px] text-black bg-white outline-none"
      value={formik.values.password}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-400"
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>

  <div className="text-yellow-400 text-[10px] !mt-0 !mb-2">
    {formik.errors.password}
  </div>
</div>
  
  
            {/* PASSWORD NOTE */}
            <div className="flex justify-between items-center mt-1 w-[280px]">
  
              <p className="text-[10px] text-yellow-400 ">
                *Never share the password with others
              </p>
  
              {!isRegister && (
                <button type='button' className="text-[10px] text-gray-300">
                  Forgot Password
                </button>
              )}
  
            </div>
  
  
            {/* ================= MAIN BUTTON ================= */}
            <button 
            type='submit'
              className="
                w-[280px]
                  h-[30px]
                   !pl-3
                  !mb-2
                !mt-5
                bg-green-600
                hover:bg-green-700
                text-white
                text-[12px]
              "
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
 </form>


          {/* ================= GOOGLE LOGIN ================= */}
          {/* {!isRegister && (

            <>
              <div className="flex items-center gap-1 my-2">

                <div className="flex-1 border-t border-gray-400"></div>

                <span className="text-[12px]">
                  OR
                </span>

                <div className="flex-1 border-t border-gray-400"></div>

              </div>


              <button
                className="
                  w-[280px]
                h-[30px]
                 !pl-3
                !mb-2
                  bg-white
                  text-gray-700
                  text-[12px]
                "
              >

                <span className="text-red-500 font-bold mr-2">
                  G
                </span>

                Sign In With Google

              </button>
            </>

          )} */}
         <>
          <p>---------------------------OR--------------------------</p>
            <GoogleLogin 
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
      handleGoogleLogin(credentialResponse)
      const decode=jwtDecode(credentialResponse.credential)
      console.log(decode);
     
      
    }}
    onError={() => {
      console.log('Login Failed');
    }}
    useOneTap
  />
         </>


          {/* ================= SWITCH ================= */}
          
          <div className="flex justify-center mt-5">

            {isRegister ? (

              <p className="text-[12px] text-gray-300">
                Are you already a user?

                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false)
                    setShowPassword(false)
                  }}
                  className="ml-1 text-blue-400 hover:underline"
                >
                  Login
                </button>
              </p>

            ) : (

              <p className="text-[12px] text-gray-300">
                Are you a new user?

                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true)
                    setShowPassword(false)
                  }}
                  className="ml-1 text-blue-400 hover:underline"
                >
                  Register
                </button>
              </p>

            )}

          </div>

        </div>

      </div>

      <Footer/>
            

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    
    </>
  )
}

export default Auth