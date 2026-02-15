import User from "../models/modeldb.js";
import Message from "../models/messagesdb.js";
import cloudinary from "../lib/cloudinary.utility.js";

export const getusers=async (req,res)=>
{
    try{
    const userid=req.user._id;
    const users= await User.find({_id : {$ne : userid}});
    res.status(201).json(
        users
);
    } 
    catch(error)
    {
        res.status(400).send("internal server error");
        console.log("something wrong",error.message);
        }
}


export const getmessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    }).sort({ createdAt: 1 }); 

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getmessages:", err.message);
    res.status(500).json({ message: err.message });
  }
};


export const sendmessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageURL = null;

    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "GO_CHAT",
      });
      imageURL = uploadResult.secure_url;
    }
    const newmsg = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageURL,
    }
  );
    await newmsg.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newmsg,
    });
  } catch (error) {
    console.error("Something went wrong:", error.message);
    res.status(500).json({
      success: false,
      message: "Message not sent",
      error: error.message,
    });
  }
};




