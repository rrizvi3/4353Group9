import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FuelQuoteForm() {
  const { clientid } = useParams();
  const [client, setClient] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [totalAmountDue, setTotalAmountDue] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleGallonsRequestedChange = (e) => {
    setGallonsRequested(e.target.value);
  };

  const handleDeliveryDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  useEffect(() => {
    // Fetch client profile data from the server
    axios
      .get(`http://localhost:5000/${clientid}`)
      .then((response) => {
        const clientData = response.data;
        setClient({
          address1: clientData.address1,
          address2: clientData.address2,
          city: clientData.city,
          state: clientData.state,
          zipcode: clientData.zip_code,
        });
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching client profile data:",
          error
        );
      });
  }, [clientid]);

  console.log("Client State:", client.state);

  const calculateQuote = async () => {
    const location = client.state === "TX" ? "in-state" : "out-of-state";
    const history = await axios.get(
      `http://localhost:5000/${clientid}/client-history`
    );
    const hasHistory = history.data.message;

    const currentPrice = 1.5;
    const locationFactor = location === "in-state" ? 0.02 : 0.04;
    const rateHistoryFactor = hasHistory ? 0.01 : 0;
    const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
    const companyProfitFactor = 0.1;

    const margin =
      currentPrice *
      (locationFactor -
        rateHistoryFactor +
        gallonsRequestedFactor +
        companyProfitFactor);

    const suggestedPrice = currentPrice + margin;
    console.log(suggestedPrice);
    const totalAmountDue = suggestedPrice * gallonsRequested;
    console.log(totalAmountDue);

    // Return the calculated values
    return {
      suggestedPrice: suggestedPrice.toFixed(2),
      totalAmountDue: totalAmountDue.toFixed(2),
    };
  };

  const handleGetQuote = async () => {
    const errors = {};
    const numericRegex = /^[0-9]*$/;

    if (
      typeof gallonsRequested !== "string" ||
      !gallonsRequested.trim() ||
      !numericRegex.test(gallonsRequested)
    ) {
      errors.gallonsRequested =
        "Gallons Requested is required and must be a number";
    }

    if (!deliveryDate) {
      errors.deliveryDate = "Delivery Date is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Validation passed, make an AJAX call to the pricing module
      const quoteResult = await calculateQuote();

      setSuggestedPrice(quoteResult.suggestedPrice);
      setTotalAmountDue(quoteResult.totalAmountDue);
      setQuoteVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quoteVisible) {
      // If quote is visible, proceed with submission

      // Submit the fuel quote data to the backend
      const data = {
        gallonsRequested,
        deliveryDate,
        suggestedPrice,
        totalAmountDue,
      };
      console.log(data);

      try {
        const response = await axios.post(
          `http://localhost:5000/${clientid}/fuel-quote`,
          data
        );

        if (response.data.success) {
          console.log("Fuel quote saved successfully");
          navigate(`/${clientid}`);
        } else {
          console.error("Fuel quote save failed");
        }
      } catch (error) {
        console.error("An error occurred during fuel quote submission:", error);
      }
    } else {
      // If quote is not visible, show an error
      console.error("Please get a quote before submitting.");
    }
  };

  return (
    <div>
      <h2>Fuel Quote Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gallonsRequested">Gallons Requested:</label>
          <input
            type="number"
            id="gallonsRequested"
            value={gallonsRequested}
            className="mx-2"
            onChange={handleGallonsRequestedChange}
            required
          />
          {errors.gallonsRequested && (
            <p className="error">{errors.gallonsRequested}</p>
          )}
        </div>
        <div>
          <label>Delivery Address:</label>
          <p>{client.address1}</p>
          <p>{client.address2}</p>
          <p>
            {client.city}, {client.state} {client.zipcode}
          </p>
        </div>
        <div>
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            className="mx-2"
            onChange={handleDeliveryDateChange}
            required
          />
          {errors.deliveryDate && (
            <p className="error">{errors.deliveryDate}</p>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary mx-2 mt-3"
          onClick={handleGetQuote}
        >
          Get Quote
        </button>
        {quoteVisible && (
          <>
            <div>
              <label>Suggested Price / gallon:</label>
              <p>${suggestedPrice}</p>
            </div>
            <div>
              <label>Total Amount Due:</label>
              <p>${totalAmountDue}</p>
            </div>
          </>
        )}
        <button className="btn btn-primary mt-3" type="submit">
          Save
        </button>
        <Link
          to={`/${clientid}/quotehistory`}
          className="btn btn-primary ms-2 mt-3"
        >
          View History
        </Link>
      </form>
    </div>
  );
}

export default FuelQuoteForm;
