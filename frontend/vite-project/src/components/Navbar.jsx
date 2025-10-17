import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Lightbulb, LightbulbOff, MessageSquare } from "lucide-react";
import { userAuthStore } from "../store/userauthstore.js";

export default function Navbar() {
  const { userauth, logout } = userAuthStore();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-theme", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const goToProfile = () => navigate("/profile");

  // ✅ New handler for logo click
  const goToHome = () => navigate("/");

  return (
    <nav className="navbar">
   
      <div className="navbar-logo" onClick={goToHome} style={{ cursor: "pointer" }}>
        <span className="logo-text">GoChat</span>
        <MessageSquare className="logo-icon" size={24} />
      </div>

      <div className="navbar-icons">
        {/* Theme Toggle */}
        <button className="navbar-button" onClick={toggleTheme} title="Toggle Theme">
          {darkMode ? <LightbulbOff size={20} /> : <Lightbulb size={20} />}
        </button>

        {userauth && (
          <>
            <button className="navbar-button" onClick={goToProfile} title="Profile">
              <User size={20} />
            </button>
            <button className="navbar-button" onClick={logout} title="Logout">
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
