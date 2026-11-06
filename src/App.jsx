import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Home from './user/pages/Home'
import Preloader from './components/Preloader'
import Auth from './pages/Auth'
import AllBooks from './user/pages/AllBooks'
import Contact from './user/pages/Contact'
import Profile from './user/pages/Profile'
import ViewBooks from './user/pages/ViewBooks'
import Dashboard from './admin/pages/Dashboard'
import Resource from './admin/pages/Resource'
import Settings from './admin/pages/Settings'
import Pnf from './pages/Pnf'
import Footer from './components/Footer'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFailed from './user/pages/PaymentFailed'
import {routerContext} from './context/RouterGuardContext'
import { useContext } from 'react'

function App() {
  const {role}=useContext(routerContext)
  const [loading,setLoading]=useState(true)
useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  },2300)
},[])
  return (
    <>
    <Routes>
      <Route path='/' element={loading? <Preloader/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/signup' element={<Auth/>}/>
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/contact' element={<Contact/>}/>


     {
     role=='user'&&
     <>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/view-book/:id/book' element={<ViewBooks/>}/>
        <Route path='/success' element={<PaymentSuccess/>}/>
          <Route path='/cancel' element={<PaymentFailed/>}/>
      </>}
      {  role=='admin'&&
        <>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/admin-resource' element={<Resource/>}/>
        <Route path='/admin-settings' element={<Settings/>}/>
      </>}
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
       
      <Route path='/*' element={<Pnf/>}/>
      

     
    </Routes>
    
    </>
  )
}

export default App
