import { User, Camera } from "lucide-react";

import { userAuthStore } from "../store/userauthstore.js";
import { useRef, useState ,useEffect} from "react";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const { userauth, isUpdatingprofile, updatingprofile ,checkauth} = userAuthStore();
  const [selectedImage, setselectedimage] = useState(null);

  useEffect(()=>
  {
   checkauth()
  },[])

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = async () => {
      const base64URL = reader.result;
      setselectedimage(base64URL);
      try {
        await updatingprofile({ profile_pic: base64URL });
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <div className="profile-image">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : userauth?.profile_pic ? (
                <img
                  src={userauth.profile_pic}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <User size={80} className="profile-icon" />
              )}
            </div>

            <button className="camera-button" onClick={handleCameraClick}>
              <Camera size={20} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="text-msg">
          {isUpdatingprofile
            ? "uploading"
            : "click on the camera icon to upload profile pic"}
        </div>

        <div className="profile-info">
          <div className="form-group">
            <input
              type="text"
              value={userauth.username}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              value={userauth.email}
              readOnly
              className="readonly-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
