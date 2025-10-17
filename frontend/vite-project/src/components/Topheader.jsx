import { useChatStore } from "../store/messagesstore.js";

export default function Topheader()
{
    const {selecteduser} =useChatStore();

    return (
        <div className="top-header">
            <div >
                                <img src={selecteduser.profile_pic} alt="../assests/user.png"></img>
            </div>
        </div>
    )
}
