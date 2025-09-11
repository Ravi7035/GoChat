
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import Signuppage from "./pages/Signuppage.jsx";
import Settingspage from "./pages/Settingspage.jsx";
import Profilepage from "./pages/Profilepage.jsx";

function App() {
 

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/settings" element={<Settingspage/>}/>
        <Route path="/profile" element={<Profilepage/>}/>
      </Routes>

    </div>
   
     
  )
}

export default App
