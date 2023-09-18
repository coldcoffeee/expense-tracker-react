import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      return password.length >= 8;
    };

    const validateForm = () => {
      const { email, password, confirmPassword } = formData;
      const errors = {
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      };

      if (email !== "" && !validateEmail(email)) {
        errors.emailError = "Please enter a valid email";
      }

      if (password !== "" && !validatePassword(password)) {
        errors.passwordError = "Please enter a strong password";
      }

      if (
        password !== "" &&
        confirmPassword !== "" &&
        password !== confirmPassword
      ) {
        errors.confirmPasswordError = "Passwords do not match";
      }

      setFormErrors(errors);
    };

    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(!Object.values(formErrors).every((error) => error === ""));
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const isValid = Object.values(formErrors).every((error) => error === "");

    if (isValid) {
      // Form is valid, you can handle form submission here.
      // For example, you can make an API call to submit the data.
      // For now, we'll just set formSubmitted to true.
      setFormSubmitted(true);
    }
  };

  return (
    <Form style={{ fontSize: "2vmin" }} onSubmit={handleSubmit}>
      <Form.Label>
        <h2>Sign Up</h2>
      </Form.Label>
      {formSubmitted && (
        <Card body className="text-danger border-danger">
          Something went wrong
        </Card>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          style={{ fontSize: "inherit" }}
          onChange={handleInputChange}
        />
        {formErrors.emailError && (
          <Form.Text className="text-danger">{formErrors.emailError}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          style={{ fontSize: "inherit" }}
          onChange={handleInputChange}
        />
        {formErrors.passwordError && (
          <Form.Text className="text-danger">
            {formErrors.passwordError}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Password"
          style={{ fontSize: "inherit" }}
          onChange={handleInputChange}
        />
        {formErrors.confirmPasswordError && (
          <Form.Text className="text-danger">
            {formErrors.confirmPasswordError}
          </Form.Text>
        )}
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{ fontSize: "inherit" }}
        disabled={
          //   !Object.values(formErrors).every((error) => error === "") ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword ||
          formData.confirmPassword !== formData.password ||
          formErrors.emailError !== ""
        }
      >
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
