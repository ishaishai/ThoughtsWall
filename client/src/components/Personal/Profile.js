import { Card } from "react-bootstrap";
import "../../styles/Profile.css";
import faker from "faker";
import { Alert, Button, Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Profile = ({ user, searchedUser }) => {
  const [editToggle, setEditToggle] = useState(true);
  const [profile, setProfile] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const queryUser = searchedUser != null ? searchedUser : user.username;
    const response = await axios.get("/api/users/get-profile", {
      params: { username: queryUser },
    });
    setProfile(response.data.userProfile);
    console.log(response.data);
  }, []);

  useEffect(() => {
    if (imagePreview != null) {
      let img = document.getElementsByClassName("profile-img-uploader")[0];
      console.log(img.height);
      console.log(img.width);
      img.onload = function () {
        if (img.height > img.width) {
          img.height = "100%";
          img.width = "auto";
        }
      };
    }
  }, [imagePreview]);

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditToggle(!editToggle);
  };
  const handleFile = (e) => {
    console.log(e.target.files);
    e.preventDefault();
    if (e.target.files[0].size / 1024 <= 100) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setError(null);
    } else {
      setError("File uploaded size exceeded 100kb");
    }
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(e);
    let formdata = new FormData();
    let file = e.target[0].files[0];

    //
    // need to check if data exist and changed and send whatever changed.
    //
    formdata.append("detailsText", e.target[1].value);
    formdata.append("profile-img", file, file.name);

    const response = await axios.post("/api/users/update-profile", formdata);
  };
  return (
    <div className="profile-container">
      <div className="profile-ticket">
        <Form onSubmit={updateProfile}>
          <div className="profile-id">
            {editToggle ? (
              <Card.Img variant="top" src={`${faker.image.people()}`} />
            ) : (
              <>
                <input
                  type="file"
                  id="actual-btn"
                  name="profile-img"
                  hidden
                  onChange={handleFile}
                />
                {imagePreview ? (
                  <div className="img-attempt-box">
                    <ImCross
                      className="profile-img-attempt-delete"
                      onClick={() => setImagePreview(null)}
                      alt="Click to remove"
                    />
                    <img src={imagePreview} className="profile-img-uploader" />
                  </div>
                ) : (
                  <label htmlFor="actual-btn" className="profile-img-uploader">
                    <FiUpload className="profile-image-uploader-icon" /> Upload
                    Image
                  </label>
                )}
              </>
            )}
            <div className="basic-details">
              <div className="profile-id-fullname">
                {`${faker.name.firstName()} ${faker.name.lastName()}`}
              </div>
              <div className="profile-id-age">30</div>
            </div>
          </div>
          <Card bg={"light"} text="dark" className="mb-2">
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
                          onClick={toggleEditMode}
                          type="none"
                          variant="info"
                        >
                          Edit Profile
                        </Button>
                      ) : (
                        <Button
                          className="edit-btn"
                          variant="success"
                          type="submit"
                        >
                          Submit
                        </Button>
                      )}
                    </>
                  )}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </div>
      {error && (
        <Alert
          style={{
            position: "absolute",
            bottom: "0px",
            width: "100% ",
            display: "flex",
            justifyContent: "center",
          }}
          variant="danger"
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, null)(Profile);
