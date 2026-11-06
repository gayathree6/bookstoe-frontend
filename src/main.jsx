import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContext from './context/SearchContext.jsx'
import RouterGuardContext from './context/RouterGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='134157364567-f3rbma1kqtnragsci339jgj9sp2b6ojv.apps.googleusercontent.com'>
       <SearchContext>
        <RouterGuardContext>
         <App />
         </RouterGuardContext>
         </SearchContext>
        </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)