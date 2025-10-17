import { useChatStore } from "../store/messagesstore.js";
import {useEffect,useState} from "react";
import { Search,Contact } from "lucide-react";
import SidebarSkeleton from "./Skeletonsidebar.jsx";
import { userAuthStore } from "../store/userauthstore.js";
export default function Sidebar()
{   
    const {isusersloading,users,getusers, selecteduser,Setselecteduser} =useChatStore();
    const {onlineUsers}=userAuthStore();
    const [searchQuery,SetsearchQuery]=useState("");
    const [selectedbox,setSelectedBox]=useState(false);

    useEffect(()=>
    {
      getusers()
    },[getusers]);

    const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
    };

    const filteredUsers = users
  .filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter(user => selectedbox ? onlineUsers.includes(user._id) : true);


   const getInitials = (username) => {
    return username.split(" ").map(n => n[0]).join("").toUpperCase();
  };

       if(isusersloading)
       {
         return <div>
           <div className="sidebar-header">
                <div className="header-top">
                  <Contact size={30} className="contact-icon"/>
                  <div 
                  >Contacts</div>
            </div>
            <div className="check-box">
              <input type="checkbox" checked={selectedbox} onChange={(e)=>
                {setSelectedBox(e.target.checked)
                }
                } className="checked-online">
              </input>
               <label>Show online only ({onlineUsers.length-1} online)</label>
              </div>
              
            <div className="search-container">
              
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search Contacts..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => SetsearchQuery(e.target.value)}
              />

            </div>
        </div>
           
           <SidebarSkeleton/>
         </div>
              
        
       }

        return  (
           <div className="sidebar-container">
             <div className="sidebar-header">
                <div className="header-top">
                  <Contact size={30} className="contact-icon"/>
                  <div 
                  >Contacts</div>
            </div>
            <div className="check-box">
              <input type="checkbox" checked={selectedbox} onChange={(e)=>
                {setSelectedBox(e.target.checked)
                }
                } className="checked-online">
              </input>
               <label>Show online only ({onlineUsers.length-1} online)</label>
              </div>
              
            <div className="search-container">
              
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search Contacts..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => SetsearchQuery(e.target.value)}
              />

            </div>
        </div>
        <div className="user-list-container">
            <div className="user-list">
      {filteredUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => Setselecteduser(user)}
          className={`user-item ${selecteduser?._id === user._id ? 'selected' : ''}`}
        >
          <div className="user-avatar-container">
          <div className="user-avatar">
              {user.profile_pic ? (
              <img
              src={user.profile_pic}
              alt={user.username}
              className="user-avatar-img"
              />
              ) : (
              getInitials(user.username)
              )}
          </div>

            {isUserOnline(user._id) && <span className="online"></span>}
          </div>
          <div className="user-info">
            <div className="user-info-top">
              <h3 className="user-name">{user.username}</h3>
            </div>
          {isUserOnline(user._id) ? (
          <div>online</div>
          ) : (
          <div>offline</div>
          )}
</div>
        </div>
      ))}
</div>
      </div>
           </div>
        );

        
    
        
}

        