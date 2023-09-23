import React, { useState } from "react";
import { Link } from "react-router-dom";

function FuelQuoteForm({ clientProfile }) {
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [errors, setErrors] = useState({});
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [totalAmountDue, setTotalAmountDue] = useState("");

  const handleGallonsRequestedChange = (e) => {
    setGallonsRequested(e.target.value);
  };

  const handleDeliveryDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  const calculateTotalAmountDue = () => {
    // In a real application, you would calculate the total amount due based on pricing data.
    // For this example, we'll assume a fixed price.
    const pricePerGallon = 2.5; // Example price per gallon
    const gallons = parseFloat(gallonsRequested);

    if (!isNaN(gallons)) {
      const amountDue = gallons * pricePerGallon;
      setTotalAmountDue(amountDue.toFixed(2));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    const numericRegex = /^[0-9]*$/;

    if (!gallonsRequested.trim() || !numericRegex.test(gallonsRequested)) {
      errors.gallonsRequested =
        "Gallons Requested is required and must be a number";
    }

    if (!deliveryDate) {
      errors.deliveryDate = "Delivery Date is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Validation passed, calculate and set the suggested price and total amount due
      calculateTotalAmountDue();
      setSuggestedPrice("2.50"); // Example suggested price
    }
  };

  return (
    <div>
      <h2>Fuel Quote Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gallonsRequested">
            Gallons Requested (numeric, required):
          </label>
          <input
            type="number"
            id="gallonsRequested"
            value={gallonsRequested}
            onChange={handleGallonsRequestedChange}
            required
          />
          {errors.gallonsRequested && (
            <p className="error">{errors.gallonsRequested}</p>
          )}
        </div>
        <div>
          <label>Delivery Address (Non-editable):</label>
          <p>{clientProfile.address1}</p>
          <p>{clientProfile.address2}</p>
          <p>
            {clientProfile.city}, {clientProfile.state} {clientProfile.zipcode}
          </p>
        </div>
        <div>
          <label htmlFor="deliveryDate">
            Delivery Date (Calender, date picker):
          </label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={handleDeliveryDateChange}
            required
          />
          {errors.deliveryDate && (
            <p className="error">{errors.deliveryDate}</p>
          )}
        </div>
        <div>
          <label>Suggested Price / gallon (numeric non-editable):</label>
          <p>{suggestedPrice}</p>
        </div>
        <div>
          <label>Total Amount Due (numeric non-editable):</label>
          <p>{totalAmountDue}</p>
        </div>
        <Link to="/client" className="btn btn-primary ms-2">
          save
        </Link>
        <Link to="/client/quotehistory" className="btn btn-primary ms-2">
          View History
        </Link>
      </form>
    </div>
  );
}

export default FuelQuoteForm;
