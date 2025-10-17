import { useChatStore } from "../store/messagesstore.js";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import Chatcontainer from "../components/Chatcontainer.jsx";
const Homepage=()=>
{   
    const {selecteduser} =useChatStore();
    return(
    <div className="homepage">
      <Navbar />
      <div className="homepage-container">
        <Sidebar />
        {!selecteduser? <NoChatSelected /> :  <Chatcontainer/> }
      </div>
    </div>
    )
}
export default Homepage;