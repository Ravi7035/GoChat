import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { userAuthStore } from "./userauthstore.js";

export const useChatStore=create((set,get)=>
(
    {
    isusersloading: false,
    ismessagesloading: false,
    users: [],
    messages: [],
    selecteduser: null,

        getusers: async () => {
        set({ isusersloading: true });
        try {
            const res = await axiosInstance.get("/messages/users", {
            withCredentials: true,
            });
            console.log("API /messages/users response:", res.data);

            set({ users: Array.isArray(res.data) ? res.data : res.data.users || [] });

        } catch (error) {
            console.error("getusers error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isusersloading: false });
        }
        }
        ,
        getmessages:async (useriD)=>
        {
            set({ismessagesloading:true});

            try{
                const res=await axiosInstance.get(`/messages/${useriD}`,{
                    withCredentials:true
                });
                set({messages:res.data});
            }
            catch(error)
            {
                toast.error(error.response.data.message);
            }
            finally{
                set({ismessagesloading:false});
            } 
        },
      sendmessages: async (messageData) => {
        const { selecteduser, messages } = get();

        if (!selecteduser?._id) {
            toast.error("No user selected");
            return;
        }

        try {
            const res = await axiosInstance.post(
            `/messages/send/${selecteduser._id}`,
            messageData,
            { withCredentials: true }
            );
            set({
            messages: [...messages, res.data?.data || res.data],
            });
        } catch (error) {
            console.error("sendmessages error:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
        }
        ,

         subscribeToMessages: () => {
    const socket = userAuthStore.getState().socket;
    const { selecteduser } = get();
    if (!socket || !selecteduser) return;

    // Remove any previous listener to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const current = get().selecteduser;
      if (
        newMessage.senderId === current._id ||
        newMessage.receiverId === current._id
      ) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  unsubscribeToMessages: () => {
    const socket = userAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },
        Setselecteduser:(selecteduser) =>
            set({selecteduser:selecteduser})
    }
))
