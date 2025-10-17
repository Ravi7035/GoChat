import { useRef, useState } from "react";
import { useChatStore } from "../store/messagesstore.js";
import { X, ImagePlus, SendHorizontal } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [ImagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const { sendmessages } = useChatStore();
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      e.target.value = null;
    }
  };
  const removePreview = () => {
    setImagePreview("");
    setImageFile(null);
  };
  const handlesendMessage = async (e) => {
  e.preventDefault();

  try {
    let base64URL = null;
    if (ImageFile) {
      const reader = new FileReader();

      reader.onload = async () => {
        base64URL = reader.result;
        await sendmessages({
          text: text.trim(),
          image: base64URL,
          timestamp: new Date().toISOString() // ✅ Add timestamp
        });
        setText("");
        setImagePreview("");
        setImageFile(null);
      };

      reader.readAsDataURL(ImageFile);
    } else {
      console.log({
         text: text.trim(),
          image: base64URL,
          timestamp: new Date().toISOString() 
      }
      )
      await sendmessages({
        text: text.trim(),
        image: null,
        timestamp: new Date().toISOString() // ✅ Add timestamp
      });
      setText("");
    }
  } catch (error) {
    console.log("Error while sending message:", error);
  }
};


  return (
    <>
      {ImagePreview && (
        <div className="preview-box">
          <img src={ImagePreview} alt="preview" className="preview-img" />
          <button className="delete-btn" onClick={removePreview}>
            <X size={16} />
          </button>
        </div>
      )}
      <form onSubmit={handlesendMessage}>
        <div className="chat-input-wrap">
          <input
            type="text"
            placeholder="Type a message..."
            className="chat-input-box"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImage}
            accept="image/*"
          />
          <button
            type="button"
            className="chat-icon-btn"
            title="Attach image"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus />
          </button>

          <button className="chat-send-btn" title="Send message" type="submit" disabled={!ImagePreview && !text.trim()}>
            <SendHorizontal />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
