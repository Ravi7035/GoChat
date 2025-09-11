
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Homepage from "./pages/Homepage.jsx";

function App() {
 

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>

    </div>
   
     
  )
}

export default App
