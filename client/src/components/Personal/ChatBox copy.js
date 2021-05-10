import "../../styles/ChatBox.css";
import { useEffect } from "react";

const ChatBox = ({ user, messages, setToggleChatBox }) => {
  return (
    <div className={`chats-container ${messages ? "show-chat" : ""}`}>
      <div id={messages ? messages["_id"] : null} className="chat-container">
        {messages &&
          messages.messages.map((item) => {
            return (
              <div
                className={`message-container ${
                  item.from === user ? "message-right" : "message-left"
                }`}
              >
                <div className="message-author">{item.from}</div>
                <div className="message-body">{item.body}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatBox;
