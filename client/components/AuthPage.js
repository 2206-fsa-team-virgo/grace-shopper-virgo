import React from "react";
import { connect } from "react-redux";
import { Login, Signup } from "./AuthForm";

const AuthPage = (props) => {
  const { name, displayName } = props;
  return (
    <div>
      <div>{displayName}</div>
      {name === "login" ? <Login /> : <Signup />}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login"
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up"
  };
};
const mapDispatch = () => {
  return {};
};

export const LoginPage = connect(mapLogin, mapDispatch)(AuthPage);
export const SignupPage = connect(mapSignup, mapDispatch)(AuthPage);
