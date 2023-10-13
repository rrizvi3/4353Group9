<<<<<<< Updated upstream
import React from "react";
import { Link } from "react-router-dom";

function FuelQuoteHistory({ quotes }) {
  return (
    <div class="mt-4">
      <h2>Fuel Quote History</h2>
      <table class="table mt-4">
=======
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function FuelQuoteHistory() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch the fuel quote history data from the backend
    axios.get('/fuel-quote-history')
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fuel quote history:", error);
      });
  }, []);

  return (
    <div className="mt-4">
      <h2>Fuel Quote History</h2>
      <table className="table mt-4">
=======
import React from "react";

function FuelQuoteHistory({ quotes }) {
  return (
    <div>
      <h2>Fuel Quote History</h2>
      <table>
>>>>>>> 809049ca97769fab0c8a5c0a77b1c29a19146993
>>>>>>> Stashed changes
        <thead>
          <tr>
            <th>Gallons Requested</th>
            <th>Delivery Address</th>
            <th>Delivery Date</th>
            <th>Suggested Price / gallon</th>
            <th>Total Amount Due</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< Updated upstream
          <tr>
            <td>{"3"}</td>
            <td>
              {"asd"}, {"asd"}
              <br />
              {"ads"}, {"asd"} {"sad"}
            </td>
            <td>{"asd"}</td>
            <td>{"adssa"}</td>
            <td>{"ads"}</td>
          </tr>
=======
<<<<<<< HEAD
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.gallonsRequested}</td>
              <td>
                {quote.clientProfile.address1}, {quote.clientProfile.address2}
                <br />
                {quote.clientProfile.city}, {quote.clientProfile.state} {quote.clientProfile.zipcode}
              </td>
              <td>{quote.deliveryDate}</td>
              <td>{quote.suggestedPrice}</td>
              <td>{quote.totalAmountDue}</td>
            </tr>
          ))}
>>>>>>> Stashed changes
        </tbody>
      </table>
      <Link to="/client" className="btn btn-primary ms-2">
        Back
      </Link>
<<<<<<< Updated upstream
=======
=======
          <tr>
            <td>{"quote.gallonsRequested"}</td>
            <td>
              {"quote.clientProfile.address1"}, {"quote.clientProfile.address2"}
              <br />
              {"quote.clientProfile.city"}, {"quote.clientProfile.state"}{" "}
              {"quote.clientProfile.zipcode"}
            </td>
            <td>{"quote.deliveryDate"}</td>
            <td>{"quote.suggestedPrice"}</td>
            <td>{"quote.totalAmountDue"}</td>
          </tr>
        </tbody>
      </table>
>>>>>>> 809049ca97769fab0c8a5c0a77b1c29a19146993
>>>>>>> Stashed changes
    </div>
  );
}

export default FuelQuoteHistory;

/*
<tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.gallonsRequested}</td>
              <td>
                {quote.clientProfile.address1}, {quote.clientProfile.address2}
                <br />
                {quote.clientProfile.city}, {quote.clientProfile.state}{" "}
                {quote.clientProfile.zipcode}
              </td>
              <td>{quote.deliveryDate}</td>
              <td>{quote.suggestedPrice}</td>
              <td>{quote.totalAmountDue}</td>
            </tr>
          ))}
        </tbody>
*/
