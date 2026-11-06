
import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'

import Header from '../components/UserHeader'
import Footer from '../../components/Footer'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Contact() {

  const form = useRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.warning("Please fill the form completely")
      return
    }
    console.log(import.meta.env.VITE_SERVICE_ID)
console.log(import.meta.env.VITE_TEMPLATE_ID)
console.log(import.meta.env.VITE_PUBLIC_KEY)

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      form.current,
      {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      }
    )
    .then(() => {
      toast.success("Thank you for contacting us! Our team will get back to you.")

      form.current.reset()

      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    })
    .catch((error) => {
      console.log('FAILED...', error)
      toast.error("Message could not be sent. Please try again.")
    })
  }

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="bg-[#14245c] text-white !py-14 !px-5 text-center">
        <h1 className="text-4xl font-bold !mb-3">
          Contact Us
        </h1>

        <p className="text-lg">
          We'd love to hear from you
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="!py-14 !px-5">

        <div className="max-w-6xl !mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            <h2 className="text-3xl font-bold !mb-4">
              Get In Touch
            </h2>

            <p className="text-gray-600 leading-7 text-justify !mb-8">
              Have a question about a book, your order, or our bookstore?
              Feel free to reach out to us. Our team is always happy to help
              you discover your next great read.
            </p>

            {/* EMAIL */}
            <div className="flex items-center gap-4 !mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-800" />
              </div>

              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-600">bookstore@gmail.com</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-4 !mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="text-blue-800" />
              </div>

              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faLocationDot} className="text-blue-800" />
              </div>

              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-gray-600">Kerala, India</p>
              </div>
            </div>

          </div>

          {/* CONTACT FORM */}
          <form ref={form} onSubmit={sendEmail}>
            <div className="bg-blue-50 rounded-lg !p-7 shadow">

              <h2 className="text-2xl font-bold !mb-6">
                Send Us a Message
              </h2>

              {/* NAME */}
              <input
                name="user_name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[45px] bg-white rounded-md !px-4 !mb-4 outline-none border border-gray-200"
              />

              {/* EMAIL */}
              <input
                name="user_email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[45px] bg-white rounded-md !px-4 !mb-4 outline-none border border-gray-200"
              />

              {/* SUBJECT */}
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-[45px] bg-white rounded-md !px-4 !mb-4 outline-none border border-gray-200"
              />

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[130px] bg-white rounded-md !px-4 !py-3 !mb-5 outline-none border border-gray-200 resize-none"
              />

              {/* SEND BUTTON */}
              <button
                type="submit"
                className="w-full h-[45px] bg-blue-900 hover:bg-blue-800 text-white rounded-md font-bold flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Message
              </button>

            </div>
          </form>

        </div>
      </section>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Contact
