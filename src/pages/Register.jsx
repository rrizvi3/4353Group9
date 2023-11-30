import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="d-grid gap-3 mx-auto col-3 mt-5 align-items-start">
      <h2>Registration</h2>
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
        <Link to="/login" className="btn btn-primary btn-sm fs-5">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Register;
