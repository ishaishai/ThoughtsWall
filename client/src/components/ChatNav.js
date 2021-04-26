import "../styles/ChatNav.css";
import ChatBox from "./Personal/ChatBox";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const ChatNav = ({ auth }) => {
  const [chat, setChat] = useState(null);
  const chats = [
    {
      _id: "123",
      users: ["ishaishai", "bla"],
      messages: [
        { from: "ishaishai", body: "hello", date: "123" },
        { from: "bla", body: "hello", date: "142" },
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
            {item.users.filter((user) => user !== auth.user.username)[0]}
          </div>
        );
      })}
      <ChatBox
        user={auth.user.username}
        messages={chat}
        setToggleChatBox={setChat}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(ChatNav);
