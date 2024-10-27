import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

const SignupForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //do validation
    if (password !== confirmPassword) {
      return setError("Password not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, userName);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account");
    }
  };

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name.."
        icon="person"
        value={userName}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <TextInput
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <TextInput
        type="text"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <Checkbox
        text="I agree to the Terms & Conditions"
        value={agree}
        required
        onChange={(e) => setAgree(e.target.value)}
      />
      <br />
      <br />
      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <a href="login.html">Login</a> instead.
      </div>
    </Form>
  );
};

export default SignupForm;
