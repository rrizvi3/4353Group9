const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server/server.js");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Server Tests", () => {
  // Test login endpoint
  describe("Login Tests", () => {
    it("should successfully log in with correct credentials", (done) => {
      const credentials = {
        username: "user1", // Provide a valid test username
        password: "password1", // Provide a valid test password
      };

      chai
        .request(app)
        .post("/login")
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(true);
          expect(res.body).to.have.property("message").eq("Login successful");
          expect(res.body).to.have.property("clientid").to.be.a("number");
          done();
        });
    });

    it("should fail to log in with incorrect password", (done) => {
      const credentials = {
        username: "user2", // Provide a valid test username
        password: "password1", // Provide an incorrect password
      };

      chai
        .request(app)
        .post("/login")
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(false);
          expect(res.body).to.have.property("message").eq("Invalid Password");
          done();
        });
    });

    it("should fail to log in with invalid username", (done) => {
      const credentials = {
        username: "nonexistentuser", // Provide a nonexistent username
        password: "password2", // Provide a valid test password
      };

      chai
        .request(app)
        .post("/login")
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(false);
          expect(res.body)
            .to.have.property("message")
            .eq("Invalid Username and/or Password");
          done();
        });
    });
  });

  // Test register endpoint
  describe("POST /register", () => {
    it("should successfully register a new user", (done) => {
      const newUser = {
        username: "newuser", // Provide a unique username for testing
        password: "testpassword", // Provide a password for testing
      };

      chai
        .request(app)
        .post("/register")
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(true);
          expect(res.body)
            .to.have.property("message")
            .eq("Registration successful");
          done();
        });
    });

    it("should fail to register with an existing username", (done) => {
      const existingUser = {
        username: "user1", // Provide an existing username
        password: "password1", // Provide a password for testing
      };

      chai
        .request(app)
        .post("/register")
        .send(existingUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(false);
          expect(res.body)
            .to.have.property("message")
            .eq("Username is already taken");
          done();
        });
    });
  });

  describe("Client Profile Tests", () => {
    let clientId; // To store the dynamically generated client ID

    // This block will run before the tests
    before(async () => {
      // Perform any setup tasks if needed
      // Create a new user or fetch an existing user for testing
      // Store the client ID for later use in tests
    });

    it("should fetch client profile data", (done) => {
      chai
        .request(app)
        .get("/" + clientId) // Use the dynamically generated client ID
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("full_name");
          expect(res.body).to.have.property("address1");
          // Add more assertions for the expected structure of the client profile data
          done();
        });
    });

    it("should update client profile data", (done) => {
      const updatedData = {
        fullName: "Updated Name",
        address1: "Updated Address 1",
        address2: "Updated Address 2",
        city: "Updated City",
        state: "NY",
        zipcode: "10001",
      };

      chai
        .request(app)
        .post("/" + clientId)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success").eq(true);
          expect(res.body)
            .to.have.property("message")
            .eq("Client profile updated successfully");
          done();
        });
    });

    it("should handle validation errors during client profile update", (done) => {
      const invalidData = {
        // Missing required fields, causing validation errors
      };

      chai
        .request(app)
        .post("/" + clientId)
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errors");
          // Add more assertions for the expected validation error messages
          done();
        });
    });

    // Add more test cases as needed

    // This block will run after the tests
    after(async () => {
      // Perform any cleanup tasks if needed
      // Delete the user or undo any changes made during setup
    });
  });

  describe("Fuel Quote History API", () => {
    it("should get fuel quote history", async () => {
      const response = await request(app).get("/:clientid/fuel-quote-history");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // Add more assertions based on the expected structure of the response
    });

    it("should save a new fuel quote", async () => {
      const fuelQuoteData = {
        gallonsRequested: 100,
        deliveryDate: "2023-12-01",
        suggestedPrice: 3.5,
        totalAmountDue: 350,
      };

      const response = await request(app)
        .post("/:clientid/fuel-quote")
        .send(fuelQuoteData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // Add more assertions based on the expected response after saving a new fuel quote
    });
  });
});
