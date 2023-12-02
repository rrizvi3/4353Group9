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

// Route for handling login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Fetch user from the database based on the provided username
    const result = await db.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    const userid = await db.query("SELECT id FROM Users WHERE username = $1", [
      username,
    ]);

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (isPasswordValid) {
        // Successful login
        res.json({
          success: true,
          message: "Login successful",
          clientid: userid.rows[0].id,
        });
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

// Route to fetch client profile data
app.get("/:clientid", async (req, res) => {
  const clientId = req.params.clientid;

  try {
    // Fetch client profile data based on clientId
    const result = await db.query("SELECT * FROM Clients WHERE user_id = $1", [
      clientId,
    ]);

    if (result.rows.length > 0) {
      const clientData = result.rows[0];
      res.json(clientData);
    } else {
      res.json({
        clientid: "",
        full_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip_code: "",
      });
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching client profile data:",
      error
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Middleware for validation
const validateProfile = (req, res, next) => {
  const { fullName, address1, address2, city, state, zipcode } = req.body;
  let errors = {};

  // Validate Full Name
  if (!fullName || fullName.trim().length === 0 || fullName.length > 50) {
    errors.fullName = "Full name is required and cannot exceed 50 characters";
  }

  // Validate Address 1
  if (!address1 || address1.trim().length === 0 || address1.length > 100) {
    errors.address1 = "Address 1 is required and cannot exceed 100 characters";
  }

  // Validate Address 2 (optional)
  if (address2 && address2.length > 100) {
    errors.address2 = "Address 2 cannot exceed 100 characters";
  }

  // Validate City
  if (!city || city.trim().length === 0 || city.length > 100) {
    errors.city = "City is required and cannot exceed 100 characters";
  }

  // Validate State
  if (!state || state.length !== 2) {
    errors.state = "State is required and must be a 2-character code";
  }

  // Validate Zipcode
  if (!zipcode || !/^\d{5}(-\d{4})?$/.test(zipcode)) {
    errors.zipcode =
      "Zipcode is required and must be in a valid format (e.g., 12345 or 12345-6789)";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Pass validation
  next();
};

// Route to update client profile data
app.post("/:clientid", validateProfile, async (req, res) => {
  const clientId = req.params.clientid;
  const data = req.body;

  try {
    // Check if the client already exists in the database
    const existingClient = await db.query(
      "SELECT * FROM Clients WHERE user_id = $1",
      [clientId]
    );

    if (existingClient.rows.length > 0) {
      // Update the existing client information
      await db.query(
        "UPDATE Clients SET full_name = $1, address1 = $2, address2 = $3, city = $4, state = $5, zip_code = $6 WHERE user_id = $7",
        [
          data.fullName,
          data.address1,
          data.address2,
          data.city,
          data.state,
          data.zipcode,
          clientId,
        ]
      );

      res.json({
        success: true,
        message: "Client profile updated successfully",
      });
    } else {
      // Handle the case where the client does not exist
      await db.query(
        "INSERT INTO Clients (user_id, full_name, address1, address2, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          clientId,
          data.fullName,
          data.address1,
          data.address2,
          data.city,
          data.state,
          data.zipcode,
        ]
      );

      res.json({
        success: true,
        message: "Client profile created successfully",
      });
    }
  } catch (error) {
    console.error("An error occurred during profile update:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route to fetch fuel quote history
app.get("/:clientid/client-history", async (req, res) => {
  const clientId = req.params.clientid;

  try {
    // Fetch client profile data based on clientId
    const result = await db.query(
      "SELECT * FROM FuelQuotes WHERE user_id = $1",
      [clientId]
    );

    if (result.rows.length > 0) {
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching client profile data:",
      error
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Route to create new fuel quote
app.post("/:clientid/fuel-quote", (req, res) => {
  const clientId = req.params.clientid;
  const { gallonsRequested, deliveryDate, suggestedPrice, totalAmountDue } =
    req.body;

  try {
    // Insert the new fuel quote into the database
    const query = {
      text: `INSERT INTO FuelQuotes (user_id, gallons_requested, delivery_date, suggested_price, total_amount_due)
             VALUES ($1, $2, $3, $4, $5)`,
      values: [
        clientId,
        gallonsRequested,
        deliveryDate,
        suggestedPrice,
        totalAmountDue,
      ],
    };

    db.query(query)
      .then(() => {
        res.json({ success: true, message: "Fuel quote saved successfully" });
      })
      .catch((error) => {
        console.error("An error occurred during fuel quote insertion:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  } catch (error) {
    console.error("An error occurred during fuel quote insertion:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route to fetch fuel quote history
app.get("/:clientid/fuel-quote-history", (req, res) => {
  res.json({ message: "No Quotes Avaliable at this time" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
