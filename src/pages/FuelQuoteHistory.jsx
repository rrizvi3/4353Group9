import React from "react";
import { Link } from "react-router-dom";

function FuelQuoteHistory({ quotes }) {
  return (
    <div class="mt-4">
      <h2>Fuel Quote History</h2>
      <table class="table mt-4">
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
