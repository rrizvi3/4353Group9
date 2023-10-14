const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001; // Choose your desired port

// Middleware to parse JSON requests
app.use(bodyParser.json());

//routes for handling the fuel quote data:
// Sample hardcoded fuel quote data (in practice, you'd connect to a database)
let fuelQuoteData = {};

// Create a route to fetch fuel quote data
app.get("/fuel-quote", (req, res) => {
  res.json(fuelQuoteData);
});

// Create a route to update fuel quote data
app.post("/fuel-quote", (req, res) => {
  const data = req.body;

  // Calculate suggested price and total amount due based on gallons requested
  const gallons = parseFloat(data.gallonsRequested);
  const pricePerGallon = 20; // Example price per gallon

  data.suggestedPrice = pricePerGallon;
  data.totalAmountDue = (gallons * pricePerGallon).toFixed(2);

  // Assuming you want to store the fuel quote data
  fuelQuoteData = data;

  // You can validate the data and perform any necessary actions here
  // For now, we're just updating the fuelQuoteData variable

  res.json({ success: true, message: "Fuel quote data updated successfully" });
});

// Sample hardcoded user data (in practice, you'd connect to a database)
const users = [{ username: "user1", password: "password1" }];

// Assuming you have a 'quotes' array with sample data
const quotes = [
  {
    gallonsRequested: 3,
    clientProfile: {
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "Sample City",
      state: "NY",
      zipcode: "10001",
    },
    deliveryDate: "2023-10-13",
    suggestedPrice: 2.5,
    totalAmountDue: 7.5,
  },
  // Add more sample quotes here
];

// Create a route to fetch fuel quote history
app.get("/fuel-quote-history", (req, res) => {
  res.json(quotes);
});

// Route for handling login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials match any user
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Successful login
    res.json({ success: true, message: "Login successful" });
  } else {
    // Failed login
    res.status(401).json({ success: false, message: "Login failed" });
  }
});

//route for handling client profile data
// Sample hardcoded client profile data (in practice, you'd connect to a database)
const mockClientData = {
  fullName: "John Doe",
  address1: "123 Main St",
  address2: "Apt 4B",
  city: "Albany",
  state: "NY",
  zipcode: "10001",
};

// Create a route to fetch client profile data
app.get("/client-profile", (req, res) => {
  res.json(mockClientData);
});

// Create a route to update client profile data
app.post("/client-profile", (req, res) => {
  const data = req.body;

  // Assuming you want to store the client profile data
  clientProfileData = data;

  // You can validate the data and perform any necessary actions here
  // For now, we're just updating the clientProfileData variable

  res.json({ success: true, message: "Client profile updated successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
