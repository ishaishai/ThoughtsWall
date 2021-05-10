import "../../styles/ChatOnlineUsers.css";
import axios from "axios";
import { connect } from "react-redux";
const ChatOnlineUsers = ({ user, toggleChatUsers, setToggleChatUsers }) => {
  const chats = [
    { user: "ishaishai", image: "bab", chat_Id: null },
    { user: "bla", image: "bab", chat_Id: null },
  ];

  const toggleChat = async (selectedChat) => {
    let chat = {
      chat_Id: selectedChat.chat_Id,
      senderName: user,
      recieverName: selectedChat.user,
    };
    const response = await axios.post("/api/chats/", chat);
    console.log(response);
  };

  return (
    <div
      className={`user-pick-container ${
        toggleChatUsers ? "show-users-pick" : ""
      }`}
    >
      <div className="user-pick-title">Online </div>
      <div className="online-users-box">
        {chats.map((chat) => {
          return (
            <div
              className="chat-toggle-item"
              onClick={() => toggleChat(chat)}
              // onClick={(chat["chat_Id"]) => toggleChat(chat["chat_Id"])}
            >
              {chat.user}
            </div>
          );
        })}
      </div>
      <hr />
      <div className="user-pick-title">Offline </div>

      <div className="offline-users-box"></div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user.username });
export default connect(mapStateToProps, null)(ChatOnlineUsers);
