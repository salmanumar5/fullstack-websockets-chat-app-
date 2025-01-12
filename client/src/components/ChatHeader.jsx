import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300 sticky top-0 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePic || "./avatar1.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                {/* User info */}
                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* close button */}
            <button className="" onClick={() => setSelectedUser(null)}>
                <X/>
            </button>
        </div>
    </div>
  )
}

export default ChatHeader