const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fuelrate",
  password: "masterpo",
  port: 5432,
});

// Connect to DB
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database: " + err);
  });

// Client Data
const client = {
  fullName: "John Doe",
  address1: "123 Main St",
  address2: "Apt 4B",
  city: "Albany",
  state: "NY",
  zipcode: "10001",
};

// Fuel Quote Data
const fuelQuoteData = {
  gallonsRequested: "100",
  deliveryDate: "2023-10-15", // Set a date in the future
  suggestedPrice: "2.50",
  totalAmountDue: "250.00",
};

// Assuming you have a 'quotes' array with sample data
const quotes = [
  {
    fuelQuoteData,
    client,
  },
];

// Create a route to fetch fuel quote history
app.get("/fuel-quote-history", (req, res) => {
  res.json(quotes);
});

// Route for handling login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Fetch user from the database based on the provided username
    const result = await db.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (isPasswordValid) {
        // Successful login
        res.json({ success: true, message: "Login successful" });
        console.log("Login successful");
      } else {
        // Failed login
        res.json({
          success: false,
          message: "Invalid Password",
        });
        console.log("Login failed: Invalid password");
      }
    } else {
      // User not found
      res.json({ success: false, message: "Invalid Username and/or Password" });
      console.log("Login failed: User not found");
    }
  } catch (error) {
    // Handle database query error
    console.error("An error occurred during login: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route for handling user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await db.query(
      "SELECT * FROM Users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      // Username is already taken
      res.json({ success: false, message: "Username is already taken" });
      console.log("Registration failed: Username is already taken");
    } else {
      // Generate a salt with the bcrypt algorithm and the "bf" option
      //const salt = await bcrypt.genSalt(10, "bf");

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(password, 6);

      // Insert the new user into the database
      await db.query(
        "INSERT INTO Users (username, password_hash) VALUES ($1, $2)",
        [username, hashedPassword]
      );

      // Successful registration
      res.json({ success: true, message: "Registration successful" });
      console.log("Registration successful");
    }
  } catch (error) {
    // Handle database query error
    console.error("An error occurred during registration: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create a route to fetch client profile data
app.get("/client-profile", (req, res) => {
  res.json(client);
});

// Validation middleware
const validateProfile = (req, res, next) => {
  // Validate required fields
  if (!req.body.fullName) {
    return res.status(400).json({ error: "Full name is required" });
  }

  // Validate field types
  if (typeof req.body.zipcode !== "string") {
    return res.status(400).json({ error: "Zipcode must be a string" });
  }

  // Validate field lengths
  if (req.body.fullName.length > 50) {
    return res.status(400).json({ error: "Full name cannot exceed 50 chars" });
  }

  // Pass validation
  next();
};

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

// Create a route to update client profile data
app.post("/client-profile", validateProfile, (req, res) => {
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
