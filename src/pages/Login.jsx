import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        // Successful login, you can redirect the user here
        console.log("Login successful");
        navigate("/:clientid");
      } else {
        // Failed login
        if (response.data.message === "Invalid Password") {
          setError("Invalid Password");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      // Handle errors
      console.error("An error occurred during login" + error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="d-grid gap-3 mx-auto col-3 mt-5 align-items-start">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="username" className="col-form-label">
              Username
            </label>
          </div>
          <div className="col-auto mt-1">
            <input
              type="text" // Change the input type to text
              id="username" // Added unique id
              className="form-control"
              value={username} // Bind value to state
              onChange={handleUsernameChange} // Handle input changes
            />
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="password" className="col-form-label">
              Password
            </label>
          </div>
          <div className="col-auto mt-1">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm fs-5 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
