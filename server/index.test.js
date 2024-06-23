const request = require("supertest");
const { app, closeServer } = require("./index");

describe("POST /submit-form", () => {
  afterAll(async () => {
    await closeServer();
  });

  it("should create a new user", async () => {
    const userData = {
      name: "John Doe",
      identity_number: "1234567894", // change this for everytime run testing because of uniqueness
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
    };

    const response = await request(app).post("/submit-form").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User data saved successfully"
    );
    expect(response.body.userData).toHaveProperty("name", "John Doe");
    expect(response.body.userData).toHaveProperty(
      "email",
      "johndoe@example.com"
    );
  });

  it("should return error when user already exists", async () => {
    const existingUserData = {
      name: "Jane Doe",
      identity_number: "1234567890", // Existing identity number
      email: "janedoe@example.com",
      date_of_birth: "1990-01-01",
    };

    await request(app).post("/submit-form").send(existingUserData);

    const response = await request(app)
      .post("/submit-form")
      .send(existingUserData);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "User already exists");
  });

  it("should return error when name is missing", async () => {
    const userData = {
      identity_number: "1234567890",
      email: "testuser@example.com",
      date_of_birth: "1995-05-05",
    };

    const response = await request(app).post("/submit-form").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Name is required");
  });

  it("should return error when identity number is not 10 digits", async () => {
    const userData = {
      name: "Test User",
      identity_number: "123456789", // 9 digits, invalid
      email: "testuser@example.com",
      date_of_birth: "1995-05-05",
    };

    const response = await request(app).post("/submit-form").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Identity Number is not valid"
    );
  });

  it("should return error when email format is invalid", async () => {
    const userData = {
      name: "Test User",
      identity_number: "1234562890",
      email: "awddaawd", // Invalid email format
      date_of_birth: "1995-05-05",
    };

    const response = await request(app).post("/submit-form").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Email is not valid");
  });

  it("should return error when date of birth is missing", async () => {
    const userData = {
      name: "Test User",
      identity_number: "1234567890",
      email: "testuser@example.com",
      // Missing date_of_birth field
    };

    const response = await request(app).post("/submit-form").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Date of Birth is required");
  });
});
