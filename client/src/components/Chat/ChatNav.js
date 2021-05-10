import "../../styles/ChatNav.css";
import ChatBox from "./ChatBox";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { chosenChatContext } from "../App";
import ChatOnlineUsers from "./ChatOnlineUsers";
import { BsChat } from "react-icons/bs";

const ChatNav = ({ auth }) => {
  const [chat, setChat] = useState(null);
  const { chatId, setChatId } = React.useContext(chosenChatContext);
  const [toggleChatUsers, setToggleChatUsers] = useState(false);
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
