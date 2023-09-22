import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Profile = () => {
  return (
    <Form className="rounded shadow p-3">
      <Card.Title className="mb-3 fs-3">Profile</Card.Title>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          placeholder="Name"
          size="lg"
          //   value={authState.email}
          //   onChange={emailChangeHandler}
        />
        {/* {error && !authState.isEmailValid && (
          <Form.Text className="text-danger">
            Please enter a valid name.
          </Form.Text>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoto">
        <Form.Control
          type="text"
          placeholder="Photo URL"
          size="lg"
          //   value={authState.password}
          //   onChange={passwordChangeHandler}
        />
        {/* {error && !authState.isPasswordValid && (
          <Form.Text className="text-danger">Invalid URL</Form.Text>
        )} */}
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
      <Button variant="success" type="submit">
        Update
      </Button>
      {/* <Form.Text className="mx-3 text-muted pointer pe-auto">
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
      </Form.Text> */}
    </Form>
  );
};

export default Profile;
