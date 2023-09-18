// SignupStates.js

import { useState } from "react";

const useSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid = () => {
    // console.log(email, password, confirmPassword);
    // console.log("\n\n");
    // console.log(emailError);
    // console.log(passwordError);
    // console.log(confirmPasswordError);
    // console.log(!!emailError && !!passwordError && !!confirmPasswordError);
    return !emailError && !passwordError && !confirmPasswordError;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    isFormValid,
  };
};

export default useSignupForm;
