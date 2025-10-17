
import {Routes,Route,Navigate} from "react-router-dom";
import {useEffect} from "react";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import SignupPage from "./pages/Signuppage.jsx";
import ProfilePage from "./pages/Profilepage.jsx";
import {userAuthStore} from "./store/userauthstore.js";

import {Loader} from "lucide-react"

import { Toaster } from "react-hot-toast";
function App() {
  const {userauth,checkauth,isCheckingAuth}=userAuthStore();
  
  useEffect(()=>
  {
    checkauth()
  },[checkauth])
  
  if(isCheckingAuth && !userauth)
  {
    return (
   <div className="initial-loader">
      <Loader size={50}/>
    </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <Routes>
         <Route path="/" element={userauth ? <Homepage/> : <Navigate to="/login"/>}/>
         <Route path="/signup" element={userauth ? <Navigate to="/" /> : <SignupPage />} />
         <Route path="/login" element={userauth ? <Navigate to="/" /> : <LoginPage />} />
         <Route path="/profile" element={userauth ? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>
       <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
            padding: "8px 12px",
            borderRadius: "8px",
          },
        }}
        containerStyle={{
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div> 
  )
}
export default App
