import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
      // Send registration data to the server
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });

      if (response.data.success) {
        // Successful registration, you can redirect the user or show a success message
        console.log("Registration successful");
        navigate("/login"); // Redirect to the login page
      } else {
        // Failed registration
        setError("Registration failed. Please try a different username.");
      }
    } catch (error) {
      // Handle errors
      console.error("An error occurred during registration" + error);
      setError(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <div className="d-grid gap-3 mx-auto col-3 mt-5 align-items-start">
      <h2>Registration</h2>
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
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={handleUsernameChange}
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
          Register
        </button>
      </form>
      <div className="mt-1">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
