import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Footer from '../../components/Footer.jsx'
import Allbooks from './AllBooks.jsx'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allAPI.js'
import { searchContext } from '../../context/SearchContext.jsx'
import { toast } from 'react-toastify'


function Home() {
 const [homeBooks,setHomeBooks]=useState([])
 console.log(homeBooks);

 const {searchKey,setSearchKey}= useContext(searchContext)
 
 useEffect(()=>{
  getBooks()
 },[])
 const getBooks=async()=>{
  const res=await getHomeBookAPI()
  if(res.status==200){
    setHomeBooks(res.data)
  }
 }
 const navigate = useNavigate();
 const handleSearch=()=>{
  if(!searchKey){
    toast.warning("please input a book title here!")
  }else if(!sessionStorage.getItem("token")){
   toast.warning("please login!!")
   setTimeout(()=>{
    navigate('/login')
   },2000)
  }
  else if(searchKey&&sessionStorage.getItem("token")){
    navigate('/all-books')
  }else{
    toast.error("something went wrong")
  }
  
 }
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <div className="relative h-[500px] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src="/background.avif"
          alt="Books"
          className="absolute inset-0 w-full h-full  object-cover"
        />

        {/* BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/90"></div>

        {/* CONTENT */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">

          <div className="flex flex-col items-center text-center w-full">

            {/* HEADING */}
            <h1
              className="text-4xl font-bold text-white"
              style={{ marginBottom: '30px' }}
            >
              Wonderful Gifts
            </h1>

            {/* DESCRIPTION */}
            <p
              className="text-lg text-white"
              style={{ marginBottom: '15px' }}
            >
              Give your family and friends a book
            </p>

            {/* SEARCH BAR */}
            <div
              className="flex items-center bg-gray-200 rounded-full w-full max-w-[500px] "
              style={{
              
                height: '40px',
                paddingLeft: '25px',
                paddingRight: '15px'
              }}
            >

              <input   onChange={(e)=>setSearchKey(e.target.value)}
                type="text"
                placeholder="Search Book"
                style={{
                  flex: 1,
                  height: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  paddingLeft: '10px',
                  fontSize: '16px'
                }}
              />

              <button onClick={handleSearch}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '0 10px',
                  fontSize: '18px',
                  color: 'blue',
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

            </div>

          </div>

        </div>

      </div>
            {/* ================= BOOKS SECTION ================= */}
     
<section className="!py-12 !px-5">

  <h2 className="text-2xl font-bold text-center !mb-2">
    NEW ARRIVALS
  </h2>
  <p className="text-xl font-bold text-center  !mb-8">
    Explore Our Latest Collection
  </p>

  <div className="md:grid grid-cols-4 !mt-5 gap-5 !ml-10">

    {/* CARD  */}
   
{/* CARD */}

{homeBooks?.length > 0 ? (
  homeBooks.map((book) => {
   console.log("Book details:", JSON.stringify(book, null, 2))

    return (
      <Link to={`/view-book/${book?._id}/book`} key={book._id}>
        <div className='shadow !p-3 rounded text-center flex flex-col items-center'>
          <img
            style={{ height: '300px', width: '100%' }}
            src={book?.imageUrl}
            alt={book?.title}
            className='object-contain'
          />
          <h4 className='text-blue-800 !mt-3'>{book?.author}</h4>
          <h3 className='font-bold'>{book?.title}</h3>
          <h4>{book?.price}</h4>
        </div>
      </Link>
    )
  })
) : (
  <p className='text-center col-span-4'>No books available</p>
)}




   

  </div>

  {/* EXPLORE MORE */}
  <div className="flex justify-center !mt-14">

    <Link to={'/all-books'} className="bg-blue-900 text-white !px-6 !py-2 rounded-md hover:bg-blue-800">
      Explore More
    </Link>

  </div>

</section>



      {/* ================= ABOUT SECTION ================= */}
      <section className="!py-16 !px-5">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center !pl-8">

          {/* TEXT */}
          <div>

            <div className='text-center'>
              <h2 className="text-xl font-bold ">
                FEATURED AUTHORS
              </h2>
              <p className='text-2xl font-bold !mb-7 '>Captivates with every word</p>
            </div>

            <p className="text-black leading-7 text-justify">
             Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.
            </p>

            <p className="text-black leading-7 mt-4 text-justify !mt-5">
              Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.
            </p>

          </div>


          {/* IMAGE */}
          <div className="flex justify-center">

            <img
              src="https://miro.medium.com/v2/resize:fit:1200/1*S81O15rjKfG-BFdnNC6-GQ.jpeg"
              alt="About our bookstore"
              className="w-full max-w-[450px] h-[280px] object-cover"
            />

          </div>

        </div>

      </section>


      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="!py-14 !px-5 bg-gray-50 text-ceter">
<div className='text-center'>
  
          <h2 className="text-center text-2xl font-bold mb-8">
            Testimonials
          </h2>
          <p>See what others are saying</p>
</div>

        <div className="max-w-2xl !mx-auto text-center">

          {/* PROFILE IMAGE */}
           <img
    src="https://t3.ftcdn.net/jpg/06/07/84/82/360_F_607848231_w5iFN4tMmtI2woJjMh7Q8mGvgARnzHgQ.jpg"
    alt="Reader"
    className="w-20 h-20 rounded-full object-cover !mx-auto mb-4"
  />


          <h3 className="text-center font-bold text-lg">
            Maria Terresa
          </h3>

          <p className="text-gray-600 mt-4 leading-7">
            "I love discovering new books through this bookstore.
            The collection is wonderful and the experience is simple
            and enjoyable."
          </p>

        </div>

      </section>
       <Footer/>
    </>
   
  )
}

export default Home