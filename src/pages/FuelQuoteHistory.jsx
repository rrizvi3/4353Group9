import React from "react";

function FuelQuoteHistory({ quotes }) {
  return (
    <div>
      <h2>Fuel Quote History</h2>
      <table>
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
