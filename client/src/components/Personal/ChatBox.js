import "../../styles/ChatBox.css";

const ChatBox = ({ messages, setToggleChatBox }) => {
  console.log(messages);
  return (
    <div className={`chats-container ${messages ? "show-chat" : ""}`}>
      <div className="chat-container"></div>
    </div>
  );
};

export default ChatBox;
