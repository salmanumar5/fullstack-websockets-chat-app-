const User = require('../models/user.model');
const Message = require('../models/message.model');
const cloudinary = require('../lib/cloudinary');
const { getReceiverSocketId, io } = require('../lib/socket');


exports.getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in the getUserForSidebar controller", error.message);
        res.status(500).json({error: "Internal Server error6"});
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { id:userToChat } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChat},
                {senderId:userToChat, receiverId:myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in the getMessages controller", error.message);
        res.status(500).json({error: "Internal Server error7"});
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("socket id check",receiverSocketId);
        console.log("socket message id check", newMessage);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in the sendMessage controller", error.message);
        res.status(500).json({error: "Internal Server error8"});
    }
};