import React from "react";
import Illustration from "../Illustration";
import SignupForm from "../SignupForm";

const SignUp = () => {
  return (
    <>
      <h1>Create an account</h1>
      <br />
      <br />
      <div className="column">
        <Illustration />
        <SignupForm />
      </div>
    </>
  );
};

export default SignUp;
