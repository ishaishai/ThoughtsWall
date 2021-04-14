import "../../styles/Contact.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Contact = ({ setContactToggle, id }) => {
  return (
    <div id={`contact-${id}`} className="contact-container">
      <div className="contact-box">
        <Card.Subtitle className="contact-subtitle">Contact</Card.Subtitle>

        <Card.Text>
          <form className="contact-form">
            <textarea
              className="contact-form-input"
              placeholder="Type your message here"
            />

            <div className="contact-buttons">
              <Button variant="success">Send</Button>
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

export default Contact;
