import { useReducer } from "react";
import axios from "axios";

const validateEmail = (email) => {
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
  return emailRegexp.test(email);
};

const validatePassword = (password) => {
  const passwordRegexp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])(?=.*[0-9]).{8,}$/;
  return passwordRegexp.test(password);
};

const reducer = (state, action) => {
  // console.log(state);
  if (action.type === "EMAIL_INPUT") {
    const isEmailValid = validateEmail(action.value);
    return {
      ...state,
      email: action.value,
      isEmailValid,
      isFormValid:
        isEmailValid && state.isPasswordValid && state.arePasswordsMatching,
    };
  } else if (action.type === "PASSWORD_INPUT") {
    const isPasswordValid = validatePassword(action.value);
    return {
      ...state,
      password: action.value,
      isPasswordValid,
      isFormValid:
        isPasswordValid && state.isEmailValid && state.arePasswordsMatching,
    };
  } else if (action.type === "CONFIRM_PASSWORD_INPUT") {
    return {
      ...state,
      confirmPassword: action.value,
      arePasswordsMatching: state.password === action.value,
      isFormValid:
        state.isPasswordValid &&
        state.isEmailValid &&
        state.password === action.value,
    };
  } else
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isEmailValid: false,
      isPasswordValid: false,
      arePasswordsMatching: false,
      isFormValid: false,
    };
};

const AuthStates = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    confirmPassword: "",
    isEmailValid: false,
    isPasswordValid: false,
    arePasswordsMatching: false,
    isFormValid: false,
  });

  const updateEmail = (email) => {
    dispatch({ type: "EMAIL_INPUT", value: email });
  };

  const updatePassword = (password) => {
    dispatch({ type: "PASSWORD_INPUT", value: password });
  };

  const updateConfirmation = (confirmPassword) => {
    dispatch({ type: "CONFIRM_PASSWORD_INPUT", value: confirmPassword });
  };

  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`;
  const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_WEB_API_KEY}`;

  const signup = async () => {
    try {
      const res = await axios.post(SIGNUP_URL, {
        email: state.email,
        password: state.password,
        returnSecureToken: true,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const signin = async () => {
    try {
      const res = await axios.post(SIGNIN_URL, {
        email: state.email,
        password: state.password,
        returnSecureToken: true,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    state,
    updateEmail,
    updatePassword,
    updateConfirmation,
    signup,
    signin,
  };
};

export default AuthStates;
