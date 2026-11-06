
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { BooksAPI, editBookStatusAPI, getUserAPI } from '../../services/allAPI'
import axiosInstance from '../../api/axiosinstance'

function Resource() {

    const [bookStatus, setBookStatus] = useState(true)
    const [userStatus, setUserStatus] = useState(false)
    const [approvedBooks, setApprovedBooks] = useState([])
    const [allBooks, setAllBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(bookStatus){
            getBooks()
        }
        else{
 getUsers()
        }
       
    }, [bookStatus,userStatus])

    const getBooks = async () => {
        const res = await BooksAPI()
        console.log("API Status:", res.status)
        console.log("All Books:", res.data)
        setAllBooks(res.data)
        setLoading(false)
    }

    const updateBookStatus = async (id) => {
        console.log("Selected Book ID:", id)

        const res = await editBookStatusAPI(id)
        console.log(res)

        if (res.status === 200) {
            setApprovedBooks([...approvedBooks, id])
        }
    }

    const handleUnapprove = (bookId) => {
        setApprovedBooks(approvedBooks.filter(id => id !== bookId))
    }

    const getUsers = async () => {
        const res = await getUserAPI()

        console.log("API Response:",res)
    console.log("User Data:",res.data)
        setUsers(res.data)
    }

    return (
        <>
            <AdminHeader />

            <div className='md:grid grid-cols-5 gap-10'>

                <div className='col-span-1 h-full'>
                    <Sidebar />
                </div>

                <div className='col-span-4'>

                    <div className='flex items-center justify-center !my-10 w-full'>

                        <p
                            onClick={() => {
                                setBookStatus(true)
                                setUserStatus(false)
                            }}
                            className={bookStatus
                                ? 'text-blue-800 !p-3 border-gray-300 border-t border-l border-r rounded cursor-pointer'
                                : '!mx-2 cursor-pointer'}
                        >
                            Book List
                        </p>

                        <p
                            onClick={() => {
                                setUserStatus(true)
                                setBookStatus(false)
                            }}
                            className={userStatus
                                ? 'text-blue-800 !p-3 border-gray-300 border-b border-l border-r rounded cursor-pointer'
                                : '!mx-2 cursor-pointer'}
                        >
                            User Status
                        </p>

                    </div>

                    {/* Book List */}

                    {bookStatus && (
                        loading ? (
                            <p className='text-center'>Loading books...</p>
                        ) : allBooks.length > 0 ? (

                            <div className='md:grid grid-cols-4 gap-6 !px-5'>

                                {allBooks.map((bk) => (

                                    <div
                                        key={bk._id}
                                        className='shadow text-center !p-3 !m-2 rounded w-full'
                                        style={{ height: '420px' }}
                                    >

                                        <Link to={`/view/${bk._id}/book`}>
                                            <img
                                                src={bk.imageUrl}
                                                alt={bk.title}
                                                className='h-64 w-full object-contain'
                                            />
                                        </Link>

                                        <div className='!p-3 flex items-center justify-center flex-col'>

                                            <p className='font-bold text-xl'>
                                                {bk.author}
                                            </p>

                                            <p className='text-blue-800 text-xl'>
                                                {bk.title}
                                            </p>

                                            <p>{bk.price}</p>

                                            {approvedBooks.includes(bk._id) ? (

                                                <button
                                                    onClick={() => handleUnapprove(bk._id)}
                                                    className="bg-blue-900 w-full h-[40px] rounded my-2"
                                                >
                                                    <span className="text-green-400 text-2xl font-bold">
                                                        ✓
                                                    </span>
                                                </button>

                                            ) : (

                                                <button
                                                    onClick={() => updateBookStatus(bk._id)}
                                                    className="bg-blue-900 w-full h-[40px] rounded my-2 text-white"
                                                >
                                                    Approve
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <p className='text-center'>No books found</p>

                        )
                    )}

                    {/* User Status */}

                   
{/* User Status */}

{userStatus && (

    <div className='md:grid grid-cols-4 gap-4 !px-5'>

        {users.map((user) => {

            return (
                <div key={user._id} className='rounded bg-gray-300 !p-2'>

                    <h4 className='text-red-800 font-bold'>
                        ID: {user?._id}
                    </h4>

                    <div className='flex justify-between items-center'>

                        <img
                            src={
                                
                                    user?.picture==""?'https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg':user?.picture.startsWith ('https://lh3.googleusercontent.com')?user?.picture:`${axiosInstance.defaults.baseURL}/uploads/${user?.picture}`}
                            
                            height={'100px'}
                            width={'100px'}
                            style={{ borderRadius: '50%' }}
                            alt=""
                        />

                        <div>
                            <h2 className='font-bold '>{user.username}</h2>
                            <h3 className='font-bold break-all'>{user.email}</h3>
                        </div>

                    </div>

                </div>
            )
        })}

    </div>

)}

                </div>

            </div>

            <Footer />
        </>
    )
}

export default Resource
