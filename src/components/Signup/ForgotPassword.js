import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import styles from "./Signup.module.css";
import { useState } from "react";
import ToastItem from "../common/ToastItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validateEmail = (email) => {
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  return emailRegexp.test(email);
};

const ForgotPassword = () => {
  const [showToast, setShowToast] = useState({
    status: "completed",
    message: "",
  });
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(true);
      return;
    }
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`,
        {
          requestType: "PASSWORD_RESET",
          email,
        }
      );
      console.log(res.data);
      setShowToast({
        status: "success",
        message: "Reset link sent to your email!",
      });
      setTimeout(setShowToast, 5000, { message: "", status: "completed" });
    } catch (err) {
      setShowToast({
        status: "error",
        message: `Error: ${
          err.response
            ? err.response.data.error.message.toLowerCase().replace(/_/g, " ")
            : err.message
        }`,
      });
      setTimeout(setShowToast, 5000, { message: "", status: "completed" });
    }
  };

  return (
    <div
      className={`${styles.landingPage} h-100 w-100 d-flex align-items-center`}
    >
      {showToast.status !== "completed" && (
        <ToastItem status={showToast.status} message={showToast.message} />
      )}
      <div className={styles.brandText}>
        <h1>SpendWize</h1>
        <h5>Your gateway to financial mindfulness.</h5>
      </div>
      <Form
        className="rounded shadow-lg p-3"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
      >
        <Card.Title className="mb-3 fs-3">Recover your account</Card.Title>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Registered email"
            size="lg"
            value={email}
            onChange={emailChangeHandler}
          />
          {error && (
            <Form.Text className="text-danger">
              Please enter a valid email.
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="success" type="submit" onClick={formSubmitHandler}>
          Get reset link
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
