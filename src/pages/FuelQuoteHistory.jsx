import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function FuelQuoteHistory() {
  const { clientid } = useParams();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch the fuel quote history data from the backend
    axios
      .get(`http://localhost:5000/${clientid}/fuel-quote-history`)
      .then((response) => {
        setQuotes(response.data.fuelQuotes);
      })
      .catch((error) => {
        console.error("Error fetching fuel quote history:", error);
      });
  }, []);
  console.log(quotes);
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
              <td>{quote.fuelQuoteData.gallonsRequested}</td>
              <td>
                {quote.address1}, {quote.address2}
                <br />
                {quote.city}, {quote.state} {quote.zipcode}
              </td>
              <td>{quote.fuelQuoteData.deliveryDate}</td>
              <td>{quote.fuelQuoteData.suggestedPrice}</td>
              <td>{quote.fuelQuoteData.totalAmountDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/${clientid}`} className="btn btn-primary ms-2">
        Back
      </Link>
    </div>
  );
}

export default FuelQuoteHistory;
