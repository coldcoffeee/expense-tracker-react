import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import styles from "./Signup.module.css";
import { useState } from "react";
import useAuthState from "./AuthStates";
import ToastItem from "../common/ToastItem";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState({
    status: "completed",
    message: "",
  });
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(false);
  const {
    state: authState,
    updateEmail,
    updatePassword,
    updateConfirmation,
    signup,
    signin,
  } = useAuthState();

  const emailChangeHandler = (e) => {
    e.preventDefault();
    updateEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    updatePassword(e.target.value);
  };

  const passwordConfirmationChangeHandler = (e) => {
    e.preventDefault();
    updateConfirmation(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (login) {
      if (authState.isEmailValid && authState.isPasswordValid) {
        try {
          const data = await signin();
          setShowToast({
            status: "success",
            message: "Logged in successfully",
          });
          setTimeout(setShowToast, 5000, { message: "", status: "completed" });
          navigate("/home", {
            state: {
              message: "Logged in successfully!",
              status: "success",
            },
          });
          console.log(data);
          localStorage.setItem("idToken", data.idToken);
        } catch (err) {
          setShowToast({
            status: "error",
            message: `Error: ${
              err.response
                ? err.response.data.error.message
                    .toLowerCase()
                    .replace(/_/g, " ")
                : err.message
            }`,
          });
          setTimeout(setShowToast, 5000, { message: "", status: "completed" });
        }
      } else {
        setError(true);
        setTimeout(setError, 5000, false);
        return;
      }
    } else {
      if (authState.isFormValid) {
        try {
          await signup();
          setShowToast({
            status: "success",
            message: "Registration successful",
          });
          setTimeout(setShowToast, 5000, { message: "", status: "completed" });
        } catch (err) {
          setShowToast({
            status: "error",
            message: `Error: ${
              err.response
                ? err.response.data.error.message
                    .toLowerCase()
                    .replace(/_/g, " ")
                : err.message
            }`,
          });
          setTimeout(setShowToast, 5000, { message: "", status: "completed" });
        }
      } else {
        setError(true);
        setTimeout(setError, 5000, false);
        return;
      }
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
      <Form className="rounded shadow p-3">
        <Card.Title className="mb-3 fs-3">
          {login ? "Sign in" : "Create an account"}
        </Card.Title>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            size="lg"
            value={authState.email}
            onChange={emailChangeHandler}
          />
          {error && !authState.isEmailValid && (
            <Form.Text className="text-danger">
              Please enter a valid email.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            size="lg"
            value={authState.password}
            onChange={passwordChangeHandler}
          />
          {error && !authState.isPasswordValid && (
            <Form.Text className="text-danger">
              Password must be at least 8 characters long and contain at least
              one lowercase letter, one uppercase letter, one symbol, and one
              number.
            </Form.Text>
          )}
        </Form.Group>
        {!login && (
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Re-enter Password"
              size="lg"
              value={authState.confirmPassword}
              onChange={passwordConfirmationChangeHandler}
            />
            {error && !authState.arePasswordsMatching && (
              <Form.Text className="text-danger">
                Passwords don't match
              </Form.Text>
            )}
          </Form.Group>
        )}
        <Button variant="success" type="submit" onClick={formSubmitHandler}>
          {login ? "Log In" : "Sign Up"}
        </Button>
        <Form.Text className="mx-3 text-muted pointer pe-auto">
          {login ? "Not registered? " : "Already registered? "}
          <a
            className="text-primary text-decoration-none align-self-center"
            href="#2123"
            onClick={(e) => {
              e.preventDefault();
              setLogin((s) => !s);
            }}
          >
            {!login ? "Log in" : "Sign up"}
          </a>
        </Form.Text>
      </Form>
    </div>
  );
}

export default Signup;
