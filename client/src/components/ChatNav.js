import "../styles/ChatNav.css";
import ChatBox from "./Personal/ChatBox";
import { useState, useEffect } from "react";
const ChatNav = () => {
  const [chat, setChat] = useState(null);
  const chats = [
    {
      user: "ishaishai",
      messages: [
        { user: "ishaishai", message: "hello", date: "babab" },
        { user: "me", message: "hello", date: "babab" },
      ],
    },
  ];

  useEffect(() => {
    console.log(chat);
  }, [chat]);
  return (
    <div className="chatnav-container">
      {chats.map((item) => {
        return (
          <div className="chat-toggle-item" onClick={() => setChat(item)}>
            {item.user}
          </div>
        );
      })}
      <ChatBox messages={chat} />
    </div>
  );
};

export default ChatNav;
