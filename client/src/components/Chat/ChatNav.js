import "../../styles/ChatNav.css";
import ChatBox from "./ChatBox";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { chosenChatContext } from "../App";
import ChatOnlineUsers from "./ChatOnlineUsers";
import { BsChat } from "react-icons/bs";
import { io } from "socket.io-client";

const ChatNav = ({ auth }) => {
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const { chatId, setChatId } = React.useContext(chosenChatContext);
  const [toggleChatUsers, setToggleChatUsers] = useState(false);

  useEffect(() => {
    console.log(auth);
    auth &&
      setSocket(
        io.connect(`ws://localhost:5000`, {
          query: { user: auth.user },
        })
      );
  }, []);

  useEffect(() => {
    socket?.on("welcome", (message) => {
      console.log(message);
      socket.emit("Thanks");
    });
  }, [socket]);
  //addchat function to pass to chatonlineusers

  // useEffect(() => {
  //   setChat(chats.filter((chat) => chat["_id"] === chatId)[0]);
  // }, [chatId]);

  // useEffect(() => {
  //   chat && setChatId(chat["_id"]);
  // }, [chat]);
  return (
    <div
      className={`chatnav-container ${toggleChatUsers ? "hide-chat-icon" : ""}`}
    >
      <BsChat
        className="chat-icon"
        onClick={() => setToggleChatUsers(!toggleChatUsers)}
      />

      <ChatOnlineUsers
        toggleChatUsers={toggleChatUsers}
        setToggleChatUsers={setToggleChatUsers}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, null)(ChatNav);
