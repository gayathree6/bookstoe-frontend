import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import {
  faUser,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import Header from '../components/UserHeader'
import { Link, useNavigate } from 'react-router-dom'
import { getBooksAPI } from "../../services/allAPI";
import { searchContext } from "../../context/SearchContext";


function AllBook() {
  const [search, setSearch] = useState("");
const [token,setToken]=useState("")
const [allBooks,setAllBooks]=useState([])
const [dummyAllBooks,setDummyAllBooks]=useState([])
const [categoryList,setCategoryList]=useState([])
console.log(categoryList);
const {searchKey,setSearchKey}= useContext(searchContext)
useEffect(()=>{
  if(sessionStorage.getItem('token')){
    setToken(sessionStorage.getItem('token'))
  }
  getBooks()
},[searchKey])
const getBooks=async()=>{
  const res=await getBooksAPI(searchKey)
  // console.log(res);
  if(res.status==200){
    setAllBooks(res.data)
    setDummyAllBooks(res.data)
    const tempCategoryList=res.data.map(bk=>bk.category)
    setCategoryList([...new Set(tempCategoryList)])
  }

  
}

const filterBooks=(category)=>{
  console.log(category);
  if(category!='all'){
      setAllBooks(dummyAllBooks?.filter(book=>book.category==category)
  )}else{
    getBooks()
  }
  
}
const navigate = useNavigate()

  return (
    <>
      <Header />

    { token?
     <>
        <div className="min-h-screen bg-white text-black">
  
          {/* ================= MAIN CONTENT ================= */}
          <main className="mx-auto max-w-full px-7">
  
            {/* ================= COLLECTIONS ================= */}
            <h2 className="mt-8 text-center text-xl font-bold w-full">
              Collections
            </h2>
  
  
            {/* ================= SEARCH ================= */}
            <div className="flex items-center !mx-auto !mt-7 !mb-12 flex max-w-[340px]">
  
              <input value={searchKey} 
                type="text"
                
               onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search by Title"
                className="h-9 flex-1 border border-gray-200 !px-3 text-[12px] outline-none"
              />
  
              <button className="h-9 w-[70px] bg-[#3c59d8] text-[12px] text-white hover:bg-[#3049bd]">
                Search
              </button>
  
            </div>
  
  
            {/* ================= CONTENT AREA ================= */}
            <div className="mt-5 flex gap-8">
  
  
              {/* ================= FILTERS ================= */}
              <aside className="w-[180px] shrink-0 !ml-[43px]">
  
                <h3 className="mb-3 text-2xl font-bold">
                  Filters
                </h3>
  
               {
                categoryList?.map(cat=>(
                  <div className="!my-2">
                <label >
                  <input onClick={()=>filterBooks(cat)} type="radio" id='Horror' name='filter' className="!me-2" /> {cat}
                </label>
               </div>
                ))
               }
                <div className="!my-2">
                <label >
                  <input onClick={()=>filterBooks('all')} type="radio" id='NoFilter' name='filter' className="!me-2" /> No Filter
                </label>
               </div>
  
              </aside>
  
  
              {/* ================= BOOKS ================= */}
              <section className="flex-1">
  
                <div className="md:grid grid-cols-4 gap-8">
  
                  {/* ================= CARD ================= */}
                  
                    {
                      allBooks?.length>0?
                      allBooks?.map(book=>(
                        <div hidden={book?.status=='Pending'||book?.status=='Sold'} className="shadow p-3 rounded text-center flex flex-col items-center">
                      <Link to={`/view-book/${book?._id}/book`}>
                      <img  
                        className="h-[180px] w-[130px] object-cover"
                        src={book?.imageUrl}
                        alt="Book"
                      />
                      </Link>
    
                      <h4 className="text-blue-800 mt-3">
                       {book?.author}
                      </h4>
    
                      <h3 className="font-bold">
                       {book?.title}
                      </h3>
    
                      <h4>
                        {book?.price}
                      </h4>
    
                    </div>
                      ))
                    :
                    <p className='text-center col-span-4'>No books available</p>
                    }
                 
  
                </div>
  
              </section>
  
            </div>
  
          </main>
  
        </div>
      </>:
      <div className="min-h-screen flex justify-center items-center flex-col">
        <img className="w-50" src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" />
        <p className="!mt-10 text-xl font-bold">Please <Link className="text-blue-600 underline" to={'/login'}>Login</Link> to Explore more...</p>

      </div>  }
    </>
  );
}

export default AllBook;