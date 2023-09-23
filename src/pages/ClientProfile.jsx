import React, { useState } from "react";
import { Link } from "react-router-dom";

function ClientProfile() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [errors, setErrors] = useState({}); // Store validation errors

  const validateForm = () => {
    const errors = {};

    // Validate required fields
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!address1.trim()) {
      errors.address1 = "Address 1 is required";
    }
    if (!city.trim()) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!zipcode.trim() || zipcode.length < 5) {
      errors.zipcode = "Zipcode must be at least 5 characters";
    }

    setErrors(errors);

    // Return true if there are no errors, indicating a valid form
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid; submit data to the server or perform other actions
      console.log("Form submitted with the following data:");
      console.log("Full Name:", fullName);
      console.log("Address 1:", address1);
      console.log("Address 2:", address2);
      console.log("City:", city);
      console.log("State:", state);
      console.log("Zipcode:", zipcode);
    } else {
      // Form is invalid; do not submit and display error messages
      console.error("Form contains errors. Please fix them.");
    }
  };

  return (
    <form class="row g-3 needs-validation" novalidate className="mt-4">
      <h1>Client Profile Management</h1>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">
          Full Name
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label">
          Username
        </label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">
            @
          </span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">
          Address 1
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">
          Address 2
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">
          City
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">
          State
        </label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">
            Choose...
          </option>
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
        </select>
        <div class="invalid-feedback">Please select a valid state.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label">
          Zip
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom05"
          required
        />
        <div class="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div class="col-12 mt-3">
        <button class="btn btn-primary" type="submit">
          save
        </button>
        <Link to="/client/newquote" className="btn btn-primary ms-2">
          New Quote
        </Link>
      </div>
    </form>
  );
}

export default ClientProfile;

/*
<div className="mx-auto">
      <h1>Client Profile Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name (required):</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            maxLength={50}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="address1">Address 1 (required):</label>
          <input
            type="text"
            id="address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            maxLength={100}
          />
          {errors.address1 && <p className="error">{errors.address1}</p>}
        </div>
        <div>
          <label htmlFor="address2">Address 2 (optional):</label>
          <input
            type="text"
            id="address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="city">City (required):</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            maxLength={100}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state">State (required):</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="">Select State</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            </select>
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div>
            <label htmlFor="zipcode">
              Zipcode (at least 5 characters required):
            </label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
              minLength={5}
              maxLength={9}
            />
            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
  */
