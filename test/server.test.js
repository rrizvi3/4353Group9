const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe("Server Tests", () => {
  describe("GET /client-profile", () => {
    it("should get client profile data", (done) => {
      chai
        .request(app)
        .get("/client-profile")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("fullName").eq("John Doe");
          expect(res.body).to.have.property("address1").eq("123 Main St");
          // Add more assertions for other properties
          done();
        });
    });
  });

  // Add more test cases for other routes as needed

  describe("Middleware Tests", () => {
    it("should pass validation for valid data", (done) => {
      const validData = {
        fullName: "Valid Name",
        zipcode: "12345",
      };

      chai
        .request(app)
        .post("/client-profile")
        .send(validData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          // Add more assertions
          done();
        });
    });

    it("should return a validation error for invalid data", (done) => {
      const invalidData = {
        // Missing 'fullName' field
        zipcode: "12345",
      };

      chai
        .request(app)
        .post("/client-profile")
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body)
            .to.have.property("error")
            .eq("Full name is required");
          // Add more assertions for other error cases
          done();
        });
    });
  });
});
