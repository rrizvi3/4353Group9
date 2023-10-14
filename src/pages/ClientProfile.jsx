import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ClientProfile() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch client profile data from the server
    axios
      .get("http://localhost:5000/client-profile")
      .then((response) => {
        const clientData = response.data;
        setFullName(clientData.fullName || "");
        setAddress1(clientData.address1 || "");
        setAddress2(clientData.address2 || "");
        setCity(clientData.city || "");
        setState(clientData.state || "");
        setZipcode(clientData.zipcode || "");
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching client profile data:",
          error
        );
      });
  }, []);

  const validateForm = () => {
    let errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!address1) {
      errors.address1 = "Address 1 is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!zipcode) {
      errors.zipcode = "Zipcode is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(zipcode)) {
      errors.zipcode = "Invalid Zipcode format";
    }

    // You can add more validation checks here, such as email validation, etc.

    setErrors(errors); // Store validation errors

    // Return true if there are no errors, indicating a valid form
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid; submit data to the server or perform other actions
      const data = {
        fullName,
        address1,
        address2,
        city,
        state,
        zipcode,
      };

      // Submit the client profile data to the backend
      try {
        const response = await axios.post("/client-profile", data);

        if (response.data.success) {
          console.log("Client profile saved successfully");
        } else {
          console.error("Client profile save failed");
        }
      } catch (error) {
        console.error("An error occurred during profile submission:", error);
      }
    } else {
      // Form is invalid; do not submit and display error messages
      console.error("Form contains errors. Please fix them.");
    }
  };

  return (
    <form
      class="row g-3 needs-validation"
      novalidate
      className="mt-4"
      onSubmit={handleSubmit}
    >
      <h1>Client Profile Management</h1>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">
          Full Name
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label">
          Address 1
        </label>
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
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
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
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
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">
          State
        </label>
        <select
          class="form-select"
          id="validationCustom04"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
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
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
        <div class="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div class="col-12 mt-3">
        <button class="btn btn-primary" type="submit">
          Save
        </button>
        <Link to="/client/newquote" className="btn btn-primary ms-2">
          New Quote
        </Link>
      </div>
    </form>
  );
}

export default ClientProfile;
