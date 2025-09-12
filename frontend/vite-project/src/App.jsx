
import {Routes,Route,Navigate} from "react-router-dom";
import {useEffect} from "react"
import Navbar from "./components/Navbar.jsx"
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import SignupPage from "./pages/Signuppage.jsx";
import Settingspage from "./pages/Settingspage.jsx";
import Profilepage from "./pages/Profilepage.jsx";
import {userAuthStore} from "./store/userauthstore.js";
import axios from "axios";
import {Loader} from "lucide-react"
import { useNavigate } from "react-router-dom";
function App() {
  const {userauth,checkauth,isCheckingAuth}=userAuthStore();
 

  useEffect(()=>
  {
    checkauth()
  },[checkauth])
  
 
  if(isCheckingAuth && !userauth)
  {
    return (
   <div className="flex items-center justify-center min-h-screen bg-green-900">
      <Loader className="w-14 h-14 text-green-400 animate-spin" />
    </div>
    )

  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={userauth ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!userauth ? <SignupPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!userauth ? <Loginpage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<Settingspage/>}/>
        <Route path="/profile" element={!userauth ? <Navigate to="/login"/>: <Profilepage/> }/>
      </Routes>

    </div> 
  )
}
export default App
