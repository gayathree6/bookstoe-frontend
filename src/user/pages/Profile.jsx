import React, { useState } from 'react'
import Header from '../components/UserHeader'
import Footer from '../../components/Footer'
import { useEffect } from 'react'
import Edit from '../components/Edit.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addBookAPI, getAbstractAPI, getBoughtBooksAPI, getUserBooksAPI, removeBookAPI } from '../../services/allAPI.js'
import useDebounce from '../../hooks/useDebounce.js'

function Profile() {
  const [activeTab, setActiveTab] = useState('')
  const [editStatus, setEditStatus] = useState(false)
  const [books, setBooks] = useState([]);
  const [dp, setDp] = useState("")
  const [userName, setUserName] = useState("")
  const [bio, setBio] = useState("")
  const [bookDetails, setBookdetails] = useState({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", category: "", uploadImages: [] })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const[uploadedBooks,setUploadedBooks]=useState([])
  const [removeBook,setRemovBook]=useState("")
  const [bookStatus,setBookStatus]=useState(false)
  const [purchaseStatus,setPurchaseStatus]=useState(false)
  const [purchasedBooks, setPurchasedBooks] = useState([])
  console.log(bookDetails);
  console.log(previewList);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let user = JSON.parse(sessionStorage.getItem("user"))
      setUserName(user.username)
      setDp(user.picture)
      setBio(user.bio)
    }
    getUserBooks()
  }, [])
 useEffect(() => {
    if (activeTab === 'status') {
        getUserBooks()
    } else if (activeTab === 'history') {
        userBoughtBook()
    }
}, [activeTab])
  const handleFileUpload = (e) => {
    const imgFile = e.target.files[0]
    setBookdetails({ ...bookDetails, uploadImages: [...bookDetails?.uploadImages, imgFile] })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList, url])
  }
  const resetForm = () => {
    setBookdetails({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", category: "", uploadImages: [] })
    setPreview("")
    setPreviewList([])
  }
  const handleAddBook=async()=>{
     const{title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages}=bookDetails
    if(!title && !author && !pages && !imageUrl && !price && !discountPrice && !abstract && !publisher && !isbn && ! language && !category && !uploadImages){
      toast.warning("fill the form completely")
    }else{
      const reqBody=new FormData()
      for(let key in bookDetails){
        if(key!="uploadImages"){
          reqBody.append(key,bookDetails[key])
          }else{
            bookDetails.uploadImages.forEach(file=>{
              reqBody.append("uploadImages",file)
            })
        }
      }
      try {
  const result = await addBookAPI(reqBody)
  console.log(result)

  if (result.status == 200) {
    toast.success("Book added successfully")
    resetForm()
  }
} catch (error) {
  console.log(error.response?.data)
  toast.error(error.response?.data?.message || "Book already exist..Operation denied")
   resetForm()
}
    }

  }

  const getUserBooks=async()=>{
    const res=await getUserBooksAPI()
    console.log(res);
    if(res.status==200){
      setUploadedBooks(res.data)
    }
    
  }

  const handleRemoveBook=async(id)=>{
    const res=await removeBookAPI(id)
    console.log(res);
     if(res.status==200){
     getUserBooks()
    toast.success("Book removed successfully")
     }
    

  }
  const userBoughtBook=async()=>{
    const res=await getBoughtBooksAPI()
    console.log(res);
    if(res.status==200){
      setPurchasedBooks(res.data)
    }
    
  }
 const debouncedTitleSearch= useDebounce(bookDetails.title,10000)
 useEffect(()=>{
  if(debouncedTitleSearch){
    console.log("gemini api call");
generateBookAbstract()
    
  }
 },[debouncedTitleSearch])
const generateBookAbstract = async () => {
    console.log("Calling Gemini for:", debouncedTitleSearch);

    const res = await getAbstractAPI(debouncedTitleSearch);
    console.log("Gemini response:", res);

    if (res.status == 200) {
        setBookdetails(prev => ({
            ...prev,
            abstract: res.data.content
        }));
    }
}
  return (
    <>
      <Header />

      {/* ================= PROFILE COVER ================= */}
      <div className="relative">

        {/* BLUE COVER */}
        <div
          className="bg-blue-950"
          style={{ height: '260px' }}
        >

          {/* PROFILE IMAGE */}
          <div
            className="absolute z-20"
            style={{
              left: '40px',
              top: '180px'
            }}
          >
            <img
              src={
                !dp
                  ? "https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
                  : dp.startsWith("http")
                    ? dp
                    : `http://localhost:3000/uploads/${encodeURIComponent(dp)}`
              } alt="Profile"
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid white',
                boxShadow: '0 !4px !15px rgba(0,0,0,0.2)'
              }}
            />
          </div>

        </div>


        {/* ================= PROFILE DETAILS ================= */}
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >

          {/* SPACE FOR PROFILE IMAGE */}
          <div style={{ paddingTop: '105px' }}>

            {/* NAME + EDIT */}
            <div className="flex items-center justify-between">

              {/* USER DETAILS */}
              <div>

                <h1 className="text-3xl font-bold text-gray-800">
                  {userName}
                </h1>

                <p className="text-gray-600 !mt-2">
                  {bio}
                </p>

              </div>


              {/* EDIT BUTTON */}
              <Edit />

            </div>


            {/* ================= TABS ================= */}
            <div className="flex justify-center gap-8 border-b !mt-6">

              {/* SELL BOOK TAB */}
              <button
                onClick={() => setActiveTab('sell')}
                className={`px-6 py-3 font-semibold ${activeTab === 'sell'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Sell Book
              </button>

              {/* BOOK STATUS TAB */}
              <button
                onClick={() => setActiveTab('status')}
                className={`px-6 py-3 font-semibold ${activeTab === 'status'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Book Status
              </button>

              {/* PURCHASE HISTORY TAB */}
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 font-semibold ${activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Purchase History
              </button>

            </div>


            {/* ================= SELL BOOK ================= */}
            {activeTab === 'sell' && (

              <div className="!mt-10 flex justify-center">

                <div className="w-full max-w-4xl bg-gray-100 rounded-lg shadow-md !p-6 md:!p-8">

                  <h2 className="text-2xl font-bold text-center !mb-6 ">
                    Book Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input value={bookDetails.title} onChange={(e) => setBookdetails({ ...bookDetails, title: e.target.value })}
                      type="text"
                      placeholder="Title"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.publisher} onChange={(e) => setBookdetails({ ...bookDetails, publisher: e.target.value })}
                      type="text"
                      placeholder="Publisher"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.author} onChange={(e) => setBookdetails({ ...bookDetails, author: e.target.value })}
                      type="text"
                      placeholder="Author"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.language} onChange={(e) => setBookdetails({ ...bookDetails, language: e.target.value })}
                      type="text"
                      placeholder="Language"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.pages} onChange={(e) => setBookdetails({ ...bookDetails, pages: e.target.value })}
                      type="number"
                      placeholder="No. of Pages"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.isbn} onChange={(e) => setBookdetails({ ...bookDetails, isbn: e.target.value })}
                      type="text"
                      placeholder="ISBN"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.imageUrl} onChange={(e) => setBookdetails({ ...bookDetails, imageUrl: e.target.value })}
                      type="text"
                      placeholder="Image URL"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.category} onChange={(e) => setBookdetails({ ...bookDetails, category: e.target.value })}
                      type="text"
                      placeholder="Category"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.price} onChange={(e) => setBookdetails({ ...bookDetails, price: e.target.value })}
                      type="number"
                      placeholder="Price"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input value={bookDetails.discountPrice} onChange={(e) => setBookdetails({ ...bookDetails, discountPrice: e.target.value })}
                      type="number"
                      placeholder="Discount Price"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea value={bookDetails.abstract} onChange={(e) => setBookdetails({ ...bookDetails, abstract: e.target.value })}
                      rows="4"
                      placeholder="Abstract"
                      className="w-full bg-white border rounded !px-4 !py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <div className="flex items-center justify-center">

                      <label htmlFor="booking" className="bg-blue-800 shadow rounded cursor-pointer">



                        <input
                          id="booking"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <img src={preview ? preview : "https://cdn.pixabay.com/photo/2024/09/10/22/37/upload-9038385_640.jpg"} width={'150px'} height={'150px'} alt="" />
                        Upload Book Image
                      </label>

                    </div>

                    {/* display uploaded images */}
                    {preview && (<div className="mb-3 flex items-center justify-center pt-5">

                      {previewList.map((url, index) => (
                        <img className='!mx-2'
                          key={index}
                          src={url}
                          width={'70px'}
                          height={'70px'}
                          alt=""
                        />
                      ))}

                      {
                        previewList?.length < 3 && <label htmlFor="booking2" className="cursor-pointer">
                          <FontAwesomeIcon icon={faPlus} className="!ms-5 text-3xl" />

                          <input
                            id="booking2"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      }
                    </div>)}
                  </div>
                  <div className="flex justify-end gap-3 !mt-6">

                    <button
                      type="button"
                      onClick={() => {
                        resetForm()
                        setActiveTab('sell')
                      }}
                    >
                      Reset
                    </button>
                    <button onClick={handleAddBook}
                      className="!px-5 !py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      ADD
                    </button>

                  </div>

                </div>

              </div>

            )}


            
            {/* ================= BOOK STATUS ================= */}
{activeTab === 'status' && (
  uploadedBooks?.length > 0 ? (
    uploadedBooks.map((bk) => (
      <div key={bk?._id} className="!p-10 !my-20 shadow rounded">
        <div className="!p-5 !mt-4 bg-gray-200 rounded">
          <div className="md:grid grid-cols-2">
            <div className="!px-4">
              <h1 className="text-2xl font-bold">{bk?.title}</h1>

              <h3 className="text-xl font-bold">{bk?.author}</h3>

              <h3 className="text-lg text-blue-950 font-bold">
                Price: {bk?.price}
              </h3>

              <h3 className="text-lg text-blue-950 font-bold">
                Discount Price: {bk?.discountPrice}
              </h3>

              <p className="text-justify">{bk?.abstract}</p>

             {
              bk?.status=='Pending'?
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/022/411/806/small/pending-rubber-stamp-red-pending-rubber-grunge-stamp-seal-illustration-vector.jpg"
                className="w-25"
                alt={bk?.title}
              />
                :
                bk?.status=='Approved'?
              <img
                src="https://png.pngtree.com/recommend-works/png-clipart/20241211/ourlarge/pngtree-approved-rubber-stamp-png-image_13872953.png"
                className="w-25"
                alt="Approval status"
              />
              :
              <img src="https://www.onlygfx.com/wp-content/uploads/2017/12/sold-stamp-3-1024x795.png" className="w-25" alt="" />}
            </div>

            <div className="flex flex-col items-center justify-center">
              <img
                src={bk?.imageUrl}
                className="w-50"
                alt=""
              />

              <div>
                <button onClick={() => handleRemoveBook(bk?._id)}className="!mt-10 bg-red-800 text-white !p-2 rounded hover:bg-white hover:text-red-800 hover:border hover:border-red-800 !ml-90">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center !my-5 text-red-600 font-bold">
      No books uploaded yet!
    </p>
  )
)}









            {/* ================= PURCHASE HISTORY ================= */}
            {activeTab === 'history' && (

              <div className='!p-10 !my-20 shadow rounded'>
                {
                  purchasedBooks?.length>0?
                  purchasedBooks?.map(bk=>(
                    <div key={bk._id} className='!p-5 !mt-4 bg-gray-200 rounded'>
                  <div className='md:grid grid-cols-2 items-center'>
                    <div className='!px-4'>
                      <h1 className='text-2xl font-bold'>{bk?.title}</h1>
                      <h3 className='text-xl font-bold'>{bk?.author}</h3>
                      <h3 className='text-lg text-blue-950 font-bold'>{bk?.price}</h3>
                      <p className='text-justify'>{bk?.abstract}</p>

                      <img src="https://i.pinimg.com/564x/f8/cd/98/f8cd98f2432d76e82942d6725169b1e3.jpg" className='w-25' alt="" />

                    </div>
                    <div className='flex flex-col items-center justify-center'>

                      <img src={bk?.imageUrl} className='w-50 ' alt="" />

                    </div>
                  </div>

                </div>
                  ))
                  :
                <p>No Books Purchased!</p> }
              </div>

            )}

          </div>

        </div>

      </div>





      <Footer />

    </>
  )
}

export default Profile