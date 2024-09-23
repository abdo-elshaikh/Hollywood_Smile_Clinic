const request = require("supertest");
const app = require("../server"); // Adjust the path as necessary
const mongoose = require("mongoose");
const User = require("../models/User"); // Ensure you have a User model
const { expect } = require("chai");
const { before } = require("mocha");

require("dotenv").config();

// Set up mongoose connection before running the tests
before(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up database after each test to ensure isolation
afterEach(async () => {
  await User.deleteMany({});
});

// Close mongoose connection after tests are finished
after(async () => {
  await mongoose.connection.close();
});

// Test routes and controllers
describe("Auth Routes and Controllers", () => {
  before(
    function () {
      this.timeout(20000);
    }
  )
  let user;
  let activationToken; // This will store the activation token dynamically
  let loginToken; // This will store the login token dynamically

  // Register a new user
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "test",
        email: "test@test.com",
        password: "Test-123",
      })
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("token");

    activationToken = res.body.token; // Adjust based on your API
  });

  // Activate user with token
  it("should activate user", async () => {
    const res = await request(app).post(`/api/auth/activate/${activationToken}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message");
  });

  // Login user
  it("should login user", async () => {
    await request(app).post("/api/auth/register").send({
      name: "test",
      email: "test@test.com",
      password: "Test-123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "Test-123",
    });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("token");

    loginToken = res.body.token; // Adjust based on your API
  });

  // Invalid login test case
  it("should not login user with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).to.equal(401); // Adjust based on your error handling
    expect({ error: "Unauthorized" }).to.deep.equal(res.body);

  });

  // Get user profile
  it("should get user profile", async () => {
    // add auth Bearer token
    const token = "Bearer " + loginToken;
    const res = await request(app).get("/api/auth/profile")
      .set("Authorization", token)

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("name", "test");
    expect(res.body).to.have.property("email", "test@test.com");
  });

  // Invalid get user profile test case
  it("should not get user profile", async () => {
    const res = await request(app).get("/api/auth/profile");

    expect(res.statusCode).to.equal(401); // Adjust based on your error handling
    expect(res.body).to.have.property("error", "Unauthorized");
  });
});
