import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FuelQuoteForm({ clientProfile }) {
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [totalAmountDue, setTotalAmountDue] = useState("");
  const [errors, setErrors] = useState({});

  const handleGallonsRequestedChange = (e) => {
    setGallonsRequested(e.target.value);
  };

  const handleDeliveryDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  useEffect(() => {
    // Fetch the fuel quote data from the backend
    axios
      .get("/fuel-quote")
      .then((response) => {
        const data = response.data;
        setGallonsRequested(data.gallonsRequested || "");
        setSuggestedPrice(data.suggestedPrice || "");
        setTotalAmountDue(data.totalAmountDue || "");
        setDeliveryDate(data.deliveryDate || "");
      })
      .catch((error) => {
        console.error("Error fetching fuel quote data:", error);
      });
  }, []);

  const calculateTotalAmountDue = () => {
    // Calculate total amount due based on the gallons requested and suggested price
    const pricePerGallon = 2.5; // Example price per gallon
    const gallons = parseFloat(gallonsRequested);

    if (!isNaN(gallons)) {
      const amountDue = gallons * pricePerGallon;
      setTotalAmountDue(amountDue.toFixed(2));
    }
  };

  const handleSubmit = async (e) => {
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
      setSuggestedPrice("2.50");

      // Submit the fuel quote data to the backend
      const data = {
        gallonsRequested,
        deliveryDate,
        suggestedPrice,
        totalAmountDue,
      };

      try {
        const response = await axios.post("/fuel-quote", data);

        if (response.data.success) {
          console.log("Fuel quote saved successfully");
        } else {
          console.error("Fuel quote save failed");
        }
      } catch (error) {
        console.error("An error occurred during fuel quote submission:", error);
      }
    } else {
      // Form is invalid; do not submit and display error messages
      console.error("Form contains errors. Please fix them.");
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
