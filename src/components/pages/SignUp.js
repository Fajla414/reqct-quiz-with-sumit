import React from "react";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

const SignUp = () => {
  return (
    <>
      <h1>Create an account</h1>
      <br />
      <br />
      <div className="column">
        <Illustration />
        <Form className={`${classes.signup} `}>
          <TextInput type="text" placeholder="Enter name.." icon="person" />
          <br />
          <TextInput
            type="email"
            placeholder="Enter email"
            icon="alternate_email"
          />
          <br />
          <TextInput type="password" placeholder="Enter password" icon="lock" />
          <br />
          <TextInput
            type="text"
            placeholder="Confirm password"
            icon="lock_clock"
          />
          <br />
          <Checkbox text="I agree to the Terms & Conditions" />
          <br />
          <br />
          <Button>
            <span>Submit Now</span>
          </Button>
          <div className="info">
            Already have an account? <a href="login.html">Login</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
