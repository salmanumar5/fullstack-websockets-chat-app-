import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in the getUser function frontend", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log(res.data);
            
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in the getMessages function frontend", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async(data) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data);
            set({messages: [...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("sendMessage function react failed", error);
        }
    },

    subscribeToMessages: () => {
        console.log("subsMessageHit");
        
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket || !socket.connected) {
            console.log("Socket not connected");
            return;
        }
        console.log("Socket connected");
        
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            
            set({
                // messages: [...get().messages, newMessage]
                messages: [...get().messages, newMessage],
            })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
        console.log(selectedUser);
        
    },
}))