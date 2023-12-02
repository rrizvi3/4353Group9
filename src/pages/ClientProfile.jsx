import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ClientProfile() {
  const { clientid } = useParams();
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    // Fetch client profile data from the server
    axios
      .get(`http://localhost:5000/${clientid}`)
      .then((response) => {
        const clientData = response.data;
        setFullName(clientData.full_name || "");
        setAddress1(clientData.address1 || "");
        setAddress2(clientData.address2 || "");
        setCity(clientData.city || "");
        setState(clientData.state || "");
        setZipcode(clientData.zip_code || "");
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching client profile data:",
          error
        );
      });
  }, [clientid]);

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
        const response = await axios.post(
          `http://localhost:5000/${clientid}`,
          data
        );
        if (response.data.success) {
          console.log("Client profile saved successfully");
          setError();
          setSuccess(response.data.message);
        } else {
          console.error("Client profile save failed:", response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("An error occurred during profile submission:", error);
        setError("Check Console");
      }
    } else {
      // Form is invalid; do not submit and display error messages
      console.error("Form contains errors. Please fix them.");
      setError("Form contains errors. Please fix them.");
    }
  };

  return (
    <form
      className="row g-3 needs-validation"
      noValidate
      onSubmit={handleSubmit}
    >
      <h1>Client Profile Management</h1>
      {error || success ? (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      ) : null}
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Address 1
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom03"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Address 2
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom03"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom03"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom04" className="form-label">
          State
        </label>
        <select
          className="form-select"
          id="validationCustom04"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option disabled value="">
            Choose...
          </option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <div className="invalid-feedback">Please select a valid state.</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom05" className="form-label">
          Zip
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom05"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div className="col-12 mt-3">
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <Link to={`/${clientid}/newquote`} className="btn btn-primary ms-2">
          New Quote
        </Link>
      </div>
    </form>
  );
}

export default ClientProfile;
