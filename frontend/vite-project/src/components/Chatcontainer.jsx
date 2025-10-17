import { useChatStore } from "../store/messagesstore";
import { useRef, useEffect } from "react";
import MessageInput from "./Messageinput";
import MessageSkeleton from "./Skeletonchatcontainer";
import { userAuthStore } from "../store/userauthstore";
import DefaultUser from "../assets/user.png";

export default function Chatcontainer() {
  const { 
    messages, 
    getmessages, 
    selecteduser, 
    ismessagesloading, 
    subscribeToMessages, 
    unsubscribeToMessages 
  } = useChatStore();
  const { userauth } = userAuthStore();
  const messagesEndRef = useRef(null); 

  // Fetch messages and subscribe to real-time updates
  useEffect(() => {
    if (selecteduser?._id) {
      getmessages(selecteduser._id);
      subscribeToMessages();
      return () => unsubscribeToMessages();
    }
  }, [selecteduser?._id, getmessages, subscribeToMessages, unsubscribeToMessages]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  if (ismessagesloading) {
    return (
      <div className="chat-container">
        <ChatHeader selecteduser={selecteduser} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader selecteduser={selecteduser} />

      <div className="chat-area-container">
        {messages?.length > 0 ? (
          messages.map((message) => {
            
            const isSender = message.senderId === userauth._id;
            return (
              <div 
                key={message._id} 
                className={isSender ? "chat-ending" : "chat-starting"}
              >
              <div className="message">
  {message.image && (
    <img src={message.image} alt="Attachment" className="message-image" />
  )}
  {message.text && (
    <p className="message-text">{message.text}</p>
  )}
</div>
                <div className="Time">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
                    : ""}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-messages">
            Start a conversation with {selecteduser?.username || "this user"}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

// Chat header component
function ChatHeader({ selecteduser }) {
  return (
    <div className="chat-header">
      <img
        src={selecteduser?.profile_pic || DefaultUser}
        alt="profile"
        className="chat-header-img"
      />
      <span className="chat-header-name">
        {selecteduser?.username || "Unknown User"}
      </span>
    </div>
  );
}
