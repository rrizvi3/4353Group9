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
        </tbody>
      </table>
      <Link to="/client" className="btn btn-primary ms-2">
        Back
      </Link>
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
