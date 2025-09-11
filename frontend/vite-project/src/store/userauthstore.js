import {create} from "zustand";

export const userAuthStore=create((set)=>
{
    userauth:null,
    isSigningup:false,
    isLoginin:false,
    isUpdatingprofile:false
    isCheckingAuth:true

    checkauth:async ()=>
    {
        try{
        const res=await axiosInstance.get("/auth/check");
        set({userauth:res.data})
        }
        catch(err)
        {
           console.log("internal error occurred",err.message);
           set({userauth:false})
        }
        finally
        {
           set({isCheckingAuth:false})
        }
    }

});
