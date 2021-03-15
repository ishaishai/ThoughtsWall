import { Card } from "react-bootstrap";
import "../../styles/Profile.css";
import faker from "faker";
import { Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Profile = ({ user, searchedUser }) => {
  const [chatActive, setChatActive] = useState(false);
  const [editToggle, setEditToggle] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    const queryUser = searchedUser != null ? searchedUser : user.username;
    const response = await axios.get("/api/users/get-profile", {
      params: { username: queryUser },
    });
    setProfile(response.data.userProfile);
    console.log(response.data);
  }, []);
  const updateProfile = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
    console.log("Asdf");
  };
  console.log(editToggle);
  return (
    <div className="profile-container">
      <div className="profile-ticket">
        <div className="profile-id">
          <Card.Img variant="top" src={`${faker.image.people()}`} />
          <div className="basic-details">
            <div className="profile-id-fullname">
              {`${faker.name.firstName()} ${faker.name.lastName()}`}
            </div>
            <div className="profile-id-age">30</div>
          </div>
        </div>
        <Card bg={"light"} text="dark" className="mb-2">
          <Form onSubmit={updateProfile}>
            <Card.Body>
              <div className="profile-about">
                <Card.Title>About {profile.username}</Card.Title>
                {editToggle ? (
                  <Card.Text>
                    {profile.info ||
                      "Enter more details that your willing to share with others."}
                  </Card.Text>
                ) : (
                  <FormControl
                    placeholder={`${
                      profile.info ||
                      "Enter more details that your willing to share with others."
                    }`}
                  />
                )}
                <Card.Title className="contact-info">Contact info </Card.Title>
                <Card.Text className="contact-info-details">
                  Email: {profile.email}
                  {profile.username === user.username && (
                    <>
                      {editToggle ? (
                        <Button
                          className="edit-btn"
                          onSelect={() => setEditToggle(!editToggle)}
                          variant={`${chatActive ? "danger" : "info"}`}
                          type="none"
                        >
                          Edit Profile
                        </Button>
                      ) : (
                        <Button
                          className="edit-btn"
                          type="submit"
                          variant="success"
                        >
                          Submit
                        </Button>
                      )}
                      <Button
                        className="chat-btn"
                        onClick={() => setChatActive(!chatActive)}
                        variant={`${chatActive ? "danger" : "success"}`}
                      >
                        {chatActive ? "Get Offline" : "Get Online"}
                      </Button>
                    </>
                  )}
                </Card.Text>
              </div>
            </Card.Body>
          </Form>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(Profile);
