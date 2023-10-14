import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // You may need to install this library

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { username, password });

      if (response.data.success) {
        // Successful login, you can redirect the user here
        console.log("Login successful");
      } else {
        // Failed login
        console.log("Login failed");
      }
    } catch (error) {
      // Handle errors
      console.error("An error occurred during login.");
    }
  };


  return (
    <div className="d-grid gap-3 mx-auto col-3 mt-5 align-items-start">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputPassword6" className="col-form-label">
              Username
            </label>
          </div>
          <div class="col-auto">
            <input
              type="password"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputPassword6" className="col-form-label">
              Password
            </label>
          </div>
          <div class="col-auto">
            <input
              type="password"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
        </div>
        <Link to="/client" className="btn btn-primary btn-sm fs-5">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Login;

/*
<div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  */
