import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
import { routerContext } from '../../context/RouterGuardContext'
import { useContext } from 'react'

function AdminHeader() {
  const {setRole,setAuthorizedUser}=useContext(routerContext)

    const navigate = useNavigate()

    const [token, setToken] = useState("")
    const [userDp, setUserDp] = useState("")
    const [userId, setUserId] = useState("")
    const [dropDwn, setDrpDwn] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }

        if (sessionStorage.getItem('user')) {
            const user = JSON.parse(sessionStorage.getItem('user'))
            setUserDp(user.picture)
            setUserId(user._id)
        }
    }, [])

    const Logout = () => {
        sessionStorage.clear()
        setAuthorizedUser(false)
        navigate('/login')
    }

    return (
        <>
            <div className='grid grid-cols-2 p-3'>

                <div className="flex items-center">

                    <img
                        src="https://static.vecteezy.com/system/resources/previews/013/729/537/non_2x/stack-of-books-isolated-illustration-stacked-books-for-logo-icon-symbol-business-design-or-decoration-stacked-blue-red-and-green-books-illustration-hygge-style-vector.jpg"
                        alt="Book Store"
                        className="w-8 h-8 md:w-9 md:h-9"
                    />

                    <h1 className='text-2xl font-bold ms-3'>
                        BOOKSTORE
                    </h1>
                </div>

                <div className='md:flex justify-end items-center hidden'>

                    {!token ?
                        <Link to={'/login'} className='!ms-5 border border-black rounded !py-2 !px-3'>
                            <FontAwesomeIcon icon={faUser} /> Login
                        </Link>
                        :
                        <div className='relative'>

                            <button
                                onClick={() => setDrpDwn(!dropDwn)}
                                className='shadow-sm !ms-4 rounded !p-1'
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={
                                        !userDp
                                            ? 'https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg'
                                            : userDp.startsWith('http')
                                                ? userDp
                                                : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`
                                    }
                                    alt="Profile"
                                />
                            </button>

                            {dropDwn && (
                                <div className="absolute right-0 top-full !mt-2 z-50 w-40 rounded !p-2 bg-white text-black shadow ring">

                                    <Link
                                        to={`/profile/${userId}`}
                                        onClick={() => setDrpDwn(false)}
                                        className="block p-2"
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        onClick={Logout}
                                        className="p-2 block cursor-pointer"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    }

                </div>

            </div>

            <nav className='flex w-full bg-black text-white text-center p-3'>
                <div className='flex w-full'>
                    <marquee>
                        Welcome, Admin! You're all set to manage and monitor the system. Let's get to work!
                    </marquee>
                </div>
            </nav>
        </>
    )
}

export default AdminHeader