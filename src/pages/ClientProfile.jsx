import React, { useState } from "react";

function ClientProfile() {
<<<<<<< Updated upstream
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
<div>
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
{/* Add more state options as needed */}
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
);
}
=======
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
    <div>
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
            {/* Add more state options as needed */}
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
  );
}
>>>>>>> Stashed changes

export default ClientProfile;
