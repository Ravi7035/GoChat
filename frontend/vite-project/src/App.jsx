
import {Routes,Route} from "react-router-dom";
import {useEffect} from "react"
import Navbar from "./components/Navbar.jsx"
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import SignupPage from "./pages/Signuppage.jsx";
import Settingspage from "./pages/Settingspage.jsx";
import Profilepage from "./pages/Profilepage.jsx";
import {userAuthStore} from "./store/userauthstore.js";
import axios from "axios";
function App() {
  const {userauth,checkauth}=userAuthStore();

  useEffect(()=>
  {
    checkauth()
  },[checkauth])
  
  if(userauth){
    console.log(userauth);
  }

  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/settings" element={<Settingspage/>}/>
        <Route path="/profile" element={<Profilepage/>}/>
      </Routes>

    </div>
   
     
  )
}

export default App
