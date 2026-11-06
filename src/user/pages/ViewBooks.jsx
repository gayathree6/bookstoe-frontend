import React, { useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackward,
  faCamera,
  faEye,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { getSingleBooksAPI, paymentAPI } from '../../services/allAPI'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'



function ViewBooks() {
  const [modalStatus, setModalStatus] = useState(false)
  const [bookDetails,setBookDetails]=useState({})
  const {id}=useParams()
  
  useEffect(()=>{
    getBooks()
  },[id])
  const getBooks=async()=>{
     const res=await getSingleBooksAPI(id)
     console.log(res);
     if(res.status==200){
      setBookDetails(res.data)
     }
     
  }
  const makePayment=async()=>{
    const res=await paymentAPI(id)
    console.log(res);
    if(res.status==200){
      const {checkoutURL}=res.data
      window.location.href=checkoutURL
    }
    
  }
  const navigate = useNavigate();
  const back=async()=>{
 navigate('/all-books')
  }
  return (
    <>
      <Header />

      <div className="md:!m-10 !m-5">
        <div className="!p-5 border shadow">

          <div className="md:grid grid-cols-3 gap-19 items-center">

            {/* Book image */}
            <div className="col-span-1">
              <img className='' src={bookDetails?.imageUrl} alt="Book" />
            </div>

            {/* Book details */}
            <div className="col-span-2">
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold">{bookDetails?.title}</h3>
                  <p className="text-blue-800">- {bookDetails?.title}</p>
                </div>

                <button onClick={() => setModalStatus(true)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>

              </div>

              <div className="md:grid grid-cols-3 !mt-5">
                <p className='font-bold'>Publisher: {bookDetails?.publisher} </p><br />
                 <p className='font-bold'>Category:{bookDetails?.category}</p>
              </div>
              <div className="md:grid grid-cols-3 !mt-5">
                <p className='font-bold'>Language:{bookDetails?.language}</p><br />
                 <p className='font-bold'>Real Price:{bookDetails?.price}</p>
              </div>
              <div className="md:grid grid-cols-3 !mt-5">
                <p className='font-bold'>No:of pages:{bookDetails?.pages}</p><br />
                 <p className='font-bold'>ISBN:{bookDetails?.isbn}</p>
              </div>
              <p className='!mt-5 text-justify'>
              {bookDetails?.abstract}</p>
<div className='!mt-5 flex justify-end'>
  <button onClick={back} className='bg-blue-900 text-white !p-2 rounded'><FontAwesomeIcon icon={faBackward}/> Back</button>
            <button onClick={makePayment} className='bg-green-900 text-white !p-2 rounded !ms-5'>Buy Now</button>
</div>
            </div>
            
          </div>

        </div>
      </div>

      {/* Modal */}
      {modalStatus && (
        <div className="relative z-10">

          <div className="bg-gray-500/75 inset-0 fixed">

            <div className="flex items-center justify-center min-h-screen">

              <div className="bg-white w-full md:!m-25 !m-5 ">

                {/* Modal header */}
                <div
                  className="flex items-center justify-between !p-4"
                  style={{ height: '100px' }}
                >
                  <h3>Book Image</h3>

                  <button onClick={() => setModalStatus(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>

                {/* Modal body */}
                <div className="!p-5 bg-white max-h-screen overflow-y-auto">
                  <p className="text-blue-700">
                    <FontAwesomeIcon icon={faCamera} />
                    {' '} Camera clicks of the books in the seller hands
                  </p>
                  <div className='md:flex !my-4 !mx-2'>
                    {/* duplicate images */}
                    {
                    bookDetails?.uploadImages?.map(filename=>(
                    <img src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`} alt="" height={'200px'} width={'200px'} className='!mx-5'/>
      ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default ViewBooks