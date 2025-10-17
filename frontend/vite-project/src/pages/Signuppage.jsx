import { useState } from "react";
import {userAuthStore} from "../store/userauthstore.js";

import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const {signup,isSigningup} =userAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const[formdata,setformdata]=useState({
    username:"",
    email:"",
    password:""
  })

  const validateform=()=>
  {
    if(!formdata.username){
        return   toast.error("username required")
    }
    if(!formdata.email)
    {
        return   toast.error("email required")
    }
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)))
    {
        return   toast.error("incorrect email")
    } 
    if(!formdata.password){
        return   toast.error("password required!")
    }
    if(formdata.password.length < 8)
    {
        return   toast.error("password length should be 8");
    }
    return true
  }
  const handlesubmit=(e)=>
  {
    e.preventDefault();
    const success = validateform();
    if(success===true)
    {
        signup(formdata)
    }

  } 
  
  return (
     <div className="signup-container">
      <div className="signup-card">
        {/* Title */}
        <h1 className="app-title">GoChat</h1>
        <p className="subtitle">Join the conversation, anytime.</p>

        <form className="signup-form" onSubmit={handlesubmit}>
          {/* Full Name */}
          <div className= "form-group">
            <User className="input-icon" size={18} />
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={formdata.username}
              onChange={(e)=>
              {
                setformdata({...formdata,username:e.target.value})
              }
            }
            />
            
          </div>

          {/* Email */}
          <div className="form-group">
            <Mail className="input-icon" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formdata.email}
              onChange={(e)=>
              {
                setformdata({...formdata,email:e.target.value})
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

          <button type="submit" className="signup-btn" >
            {
                isSigningup ? (
                    <>
                      <Loader2 className="spin"/>
                      loading...
                    </>
                ):
                (
                    "Create Account"
                )
            }
              
          </button>
        </form>

        <p className="login-text">
          Already on GoChat? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
