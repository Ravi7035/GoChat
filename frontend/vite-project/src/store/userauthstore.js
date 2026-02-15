    import { create } from "zustand";
    import {axiosInstance} from "../lib/axios.js"; 
    import toast from "react-hot-toast";
    import {io} from "socket.io-client";
    const baseURL =
  import.meta.env.PROD
    ? "https://gochat-1-vpu4.onrender.com"
    : "http://localhost:5002";

    export const userAuthStore = create((set,get) => ({
      userauth: null,
      isSigningup: false,
      isLoginin: false,
      isUpdatingprofile: false,
      isCheckingAuth: true,
      socket:null,
      onlineUsers:[],
      checkauth: async () => {
        set({isCheckingAuth:true})
        try {
          const res = await axiosInstance.get("/auth/check");
          console.log(res.data);
          set({ userauth: res.data }); 
          if(res.data)
            {
              get().connectSocket();
            } 
        } catch (err) {
          console.log(err.response?.data?.message ||  "Auth check failed");
          set({ userauth: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
      signup:async (data)=>
      {
        set({isSigningup:true});
        try{
            const res = await axiosInstance.post("/auth/signup", data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
            set({userauth:res.data});
            toast.success("account created successfully");
            get().connectSocket()
        }
        catch(err)
        {  
            toast.error(err.response?.data?.message);
        }
          
        finally{
            set({isSigningup:false})
        }
      },
      login:async (data)=>
      {
        set({isLoginin:true});
        try{
            const res = await axiosInstance.post("/auth/login", data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
            }
            );
            set({userauth:res.data});
            toast.success("login successfully");
            get().connectSocket()
          
        }
        catch(error)
        {
          toast.error(error.response?.data?.message || "something went wrong");
        }
        finally{
          set({isLoginin:false})
        }
      },
      logout:async ()=>
      {
        try{
            await axiosInstance.post("/auth/logout",{ withCredentials: true });
            set({userauth:null});
            toast.success("logout successfull");
            get().disconnectSocket();
        }
        catch(error)
        {
            toast.error("error occurred");
        }
      },
      updatingprofile:async (data)=>
      {
        try{
          set({isUpdatingprofile:true});
          const res=await axiosInstance.put("/auth/updateprofile",data,
            {
              withCredentials:true
            }
          );
          set({userauth:res.data});
          toast.success("profile picture updated successfully");

        }
        catch(error)
        {
          console.log("internal error occurred");
          toast.error(error.response.data.message);
        }
        finally{
          set({isUpdatingprofile:false})
        }
      },
    connectSocket: () => {
          const { userauth} = get();
          if (!userauth || get().socket?.connected) return;
          const socket = io(baseURL,{ query: { userId: userauth._id } });
          socket.on("connect", () => console.log("Socket connected:", socket.id));
          socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
          set({ socket: socket})
          socket.on("getOnlineUsers",(userIds)=>
          {
          console.log("online users are",userIds);
          set({onlineUsers:userIds});
          });
          }
  ,
    disconnectSocket: () => {
  const { socket } = get();
  if (socket) {
    socket.off("getOnlineUsers");
    socket.disconnect();
    set({ socket: null });
  }
}
    }
  ))