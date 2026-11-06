import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import {verifyPaymentAPI} from '../../services/allAPI'
import { Link } from 'react-router-dom'

function PaymentSuccess() {

  useEffect(()=>{
    verifyPayment()
  },[])

  const verifyPayment=async()=>{
    const sessionID=new URLSearchParams(window.location.search).get("session_id")
    const res=await verifyPaymentAPI({sessionID})
    console.log(res);
    
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 !px-4'>
        <div className='bg-white w-full max-w-md rounded-2xl shadow-lg !p-8 text-center'>
            <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="" className="w-60" />
            <h1 className='text-3xl font-bold text-gray-800 !mb-3'>
                Payment Successfull
            </h1>
            <p className="text-gray-800 !mb-6">
              Your payment has been completed successfully.
            </p>
            <div className="bg-gray-100 rounded-lg !p-4 text-left !mb-6">
                <p className="text-gray-800 !mb-2">
                    Order status: <span className='text-green-600 font-semibold'>Paid</span>
                </p>
                <p className="text-gray-600 text-center !py-7">
            Thank you for shopping with us!
          </p>
          <Link to={'/all-books'} className="bg-blue-900 text-white !px-6 !py-2 rounded-md hover:bg-blue-800">
      Explore More
    </Link>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess