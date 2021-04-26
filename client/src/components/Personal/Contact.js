import "../../styles/Contact.css";
import { Card, Button } from "react-bootstrap";
import { sendMessage } from "../../actions/index";
import { connect } from "react-redux";

const Contact = ({ owner, setContactToggle, id, sendMessage, user }) => {
  const handleMessage = (e) => {
    e.preventDefault();
    sendMessage({
      targetUser: owner,
      sourceUser: user,
      message: e.target[0].value,
    });
  };
  return (
    <div id={`contact-${id}`} className="contact-container">
      <div className="contact-box">
        <Card.Subtitle className="contact-subtitle">Contact</Card.Subtitle>

        <Card.Text>
          <form className="contact-form" onSubmit={handleMessage}>
            <textarea
              className="contact-form-input"
              placeholder="Type your message here"
            />

            <div className="contact-buttons">
              <Button variant="success" type="submit">
                Send
              </Button>
              <Button variant="danger" onClick={() => setContactToggle()}>
                Close
              </Button>
            </div>
          </form>
        </Card.Text>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user.username });
export default connect(mapStateToProps, { sendMessage })(Contact);
