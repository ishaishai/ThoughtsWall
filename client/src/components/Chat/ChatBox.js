import "../../styles/ChatBox.css";
import { Modal, Button, FormControl, Form } from "react-bootstrap";

import Loader from "../Loader";
import Message from "./Message";

const ChatBox = ({ LoggedUser, messages, setToggleChatBox, toggleChatBox }) => {
  return (
    <Modal
      className="comments-modal"
      show={toggleChatBox ? true : false}
      onHide={() => setToggleChatBox(null)}
    >
      {/* //show={show} onHide={handleClose}> */}
      <Modal.Header closeButton>
        <Modal.Title>
          Chat with{" "}
          {messages &&
            messages.users.filter((userInChat) => userInChat !== LoggedUser)[0]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {messages ? (
          messages.messages.map((item) => {
            console.log(item);
            return (
              <Message
                LoggedUser={LoggedUser}
                author={item.from}
                text={item.body}
                date={item.date}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </Modal.Body>

      {LoggedUser ? (
        <Modal.Footer>
          <Form>
            <FormControl placeholder="Enter your message here!" />
            <Button variant="danger" onClick={() => setToggleChatBox(null)}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Send
            </Button>
          </Form>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default ChatBox;
