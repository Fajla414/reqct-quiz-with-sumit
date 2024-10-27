import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login");
    }
  };

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <br />
      <br />
      <TextInput
        type="text"
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
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
