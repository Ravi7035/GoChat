import { MessageCircle } from 'lucide-react';

const NoChatSelected= () => {
  return (
    <div className="Nochat-container">
      <div className="welcome-content">
        <div className="icon-container">
          <MessageCircle size={80} className="message-icon bounce" />
        </div>
        <h1 className="welcome-title">Welcome to Your Messaging App</h1>
        <p className="welcome-text">Select a conversation  to start chatting</p>
      </div>
    </div>
  );
}
export default NoChatSelected;