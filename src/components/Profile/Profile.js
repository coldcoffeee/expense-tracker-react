import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToastItem from "../common/ToastItem";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const nav = useNavigate();
  const [name, setName] = useState("");
  const [picURL, setPicURL] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`,
          {
            idToken: localStorage.getItem("idToken"),
          }
        );
        if (data.users[0].displayName && data.users[0].photoUrl) {
          setName(data.users[0].displayName);
          setPicURL(data.users[0].photoUrl);
        }
      } catch (err) {
        console.log("Error fetching data.");
        setShowNotification({
          status: "error",
          message: "Something went wrong",
        });
        setTimeout(setShowNotification, 5000, null);
      }
    })();
  }, []);

  const [error, setError] = useState("");

  const [showNotification, setShowNotification] = useState(null);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const picURLChangeHandler = (e) => {
    setPicURL(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name.match(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)) {
      setError("name");
      setTimeout(setError, 4000, "");
      return;
    } else if (
      !picURL
        .split("?")[0]
        .match(
          /^(https?:\/\/(?:www.)?[a-zA-Z0-9-]+\.[a-zA-Z]+(?:\.[a-zA-Z]+)?\/[^\s]+\.(?:jpg|jpeg|png|gif))$/
        )
    ) {
      setError("url");
      setTimeout(setError, 4000, "");
      return;
    } else {
      // console.log(name, picURL);
      // setName("");
      // setPicURL("");
      try {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`,
          {
            idToken: localStorage.getItem("idToken"),
            displayName: name,
            photoUrl: picURL,
            returnSecureToken: false,
          }
        );
        if (res.status === 200) {
          setShowNotification({
            status: "success",
            message: "Profile updated successfully",
          });
          setTimeout(() => {
            setShowNotification(null);
            // nav("/home");
          }, 4000);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        setShowNotification({
          status: "error",
          message: "Something went wrong",
        });
        setTimeout(setShowNotification, 5000, null);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      {showNotification && (
        <ToastItem
          status={showNotification.status}
          message={showNotification.message}
        />
      )}
      <div className={styles.textArea}>
        <h1>Personalise your profile</h1>
        <small>Help us know you better</small>
      </div>
      <Form className="rounded shadow p-5">
        <Card.Title className="mb-3 fs-3">User Details</Card.Title>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            size="lg"
            required
            value={name}
            onChange={nameChangeHandler}
          />
          {error === "name" && (
            <Form.Text className="text-danger">
              Please enter a valid name.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Control
            type="text"
            placeholder="Photo URL"
            size="lg"
            value={picURL}
            onChange={picURLChangeHandler}
          />
          {error === "url" && (
            <Form.Text className="text-danger">
              Please enter a valid image URL
            </Form.Text>
          )}
        </Form.Group>
        {/* {!login && (
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            size="lg"
            value={authState.confirmPassword}
            onChange={passwordConfirmationChangeHandler}
          />
          {error && !authState.arePasswordsMatching && (
            <Form.Text className="text-danger">Passwords don't match</Form.Text>
          )}
        </Form.Group>
      )} */}
        <Button variant="success" type="submit" onClick={formSubmitHandler}>
          Update
        </Button>
        <br />
        <br />
        <Form.Text className="text-danger pointer pe-auto">
          Looks like your email is unverified.
          <br />
          <a
            className="text-primary text-decoration-none align-self-center"
            href="#2123"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await axios.post(
                  `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`,
                  {
                    idToken: localStorage.getItem("idToken"),
                    requestType: "VERIFY_EMAIL",
                  }
                );
                setShowNotification({
                  status: "success",
                  message: "Verification link sent. Please check your email.",
                });
                setTimeout(setShowNotification, 5000, null);
              } catch (error) {
                console.log(error);
                setShowNotification({
                  status: "error",
                  message: "Something went wrong",
                });
                setTimeout(setShowNotification, 5000, null);
              }
            }}
          >
            Click here to verify your email.
          </a>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Profile;
