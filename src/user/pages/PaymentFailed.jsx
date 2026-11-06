import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    
    <div className='min-h-screen flex items-center justify-center bg-gray-50 !px-4'>
        <div className='bg-white w-full max-w-md rounded-2xl shadow-lg !p-8 text-center'>
           <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" />
            <h1 className='text-3xl font-bold text-gray-800 !mb-3'>
                Payment Failed
            </h1>
            <p className="text-gray-800 !mb-6">
              Oops! We couldn't process your payment. Please try again.
            </p>
            <div className="bg-gray-100 rounded-lg !p-4 text-left !mb-6">
                <p className="text-gray-800 !mb-2">
                    Order status: <span className='text-red-600 font-semibold'>Failed</span>
                </p>
                <p className="text-gray-600 text-center !py-7">
           Please check your payment details or try another payment method
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