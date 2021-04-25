import "../styles/ChatNav.css";

const ChatNav = () => {
  const chats = [
    {
      user: "ishaishai",
      messages: [
        { user: "ishaishai", message: "hello", date: "babab" },
        { user: "me", message: "hello", date: "babab" },
      ],
    },
  ];
  return (
    <div className="chatnav-container">
      {chats.map((item) => {
        return <div className="chat-toggle-item">{item.user}</div>;
      })}
    </div>
  );
};

export default ChatNav;
