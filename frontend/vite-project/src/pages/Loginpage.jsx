import { useState } from "react";
import {userAuthStore} from "../store/userauthstore.js";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import { Link } from "react-router-dom";


export default function LoginPage() {

  const {login,isLoginin} =userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const[formdata,setformdata]=useState({
    username:"",
    password:""
  })

const validateform=()=>
  {
    if(!formdata.username){
        return   toast.error("username required")
    }
    if(!formdata.password){
        return   toast.error("password required!")
    }
    return true
  }
    const handlesubmit=(e)=>
  {
    e.preventDefault();
    const success = validateform();
    if(success===true)
    {
        login(formdata)
    }
}
return (
    <div className="login-container">
      <div className="login-card">
        {/* Title */}
        <h1 className="app-title">GoChat</h1>
        <p className="subtitle">Join the conversation, anytime.</p>

        <form className="login-form" onSubmit={handlesubmit}>
          {/* Full Name */}
          <div className= "form-group">
            <User className="input-icon" size={18} />
            <input
              placeholder="User Name"
              type="text"
              name="username"
              value={formdata.username}
              onChange={(e)=>
              {
                setformdata({...formdata,username:e.target.value})
              }
            }
            />
           
          </div>
          {/* Password */}
          <div className="form-group">
            <Lock className="input-icon" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formdata.password}
              onChange={(e)=>
              {
                setformdata({...formdata,password:e.target.value})
              }
            }
            />
            
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="login-button">
            {
                isLoginin ? (
                    <>  
                      <Loader2 className="spin"/>
                      loading...
                    </>
                ):
                (
                    "Loginin"
                )
            }
              
          </button>
        </form>

        <p className="signup-text">
          No Account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
)
}