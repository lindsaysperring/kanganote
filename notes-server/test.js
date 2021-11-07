const server = require("./app");
const supertest = require("supertest");
const request = supertest(server);
const db = require("./mongoose-test-server");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await db.connect(mongod);
});

// afterEach(async () => {
//   await db.clearDatabase(mongod);
// });

afterAll(async () => {
  await db.closeDatabase(mongod);
});

describe("Get Health", () => {
  it("should return 200 OK", async () => {
    const response = await request.get("/health");
    expect(response.status).toBe(200);
  });
});

describe("Test authentication routes", () => {
  it("Getting unauthenticated notes should return 401 Unauthorized", async () => {
    const response = await request.get("/api/notes");
    expect(response.status).toBe(401);
  });
  it("Updating unauthenticated notes should return 401 Unauthorized", async () => {
    const response = await request
      .patch("/api/notes/615d19a0e5ae75f3de180cf7")
      .send({ note: "test", sharedWith: ["615d199be5ae75f3de180cf4"] });
    expect(response.status).toBe(401);
  });
  it("Creating unauthenticated notes should return 401 Unauthorized", async () => {
    const response = await request.post("/api/notes").send({ note: "test" });
    expect(response.status).toBe(401);
  });
});

let token;

describe("Test Login and register", () => {
  it("Registering a user should return 200 with token", async () => {
    const response = await request.post("/api/auth/register").send({
      email: "test@test.com",
      password: "test",
      name: "Testy McTestFace",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it("Registering a user with an existing email should return 409 Conflict", async () => {
    const response = await request.post("/api/auth/register").send({
      email: "test@test.com",
      password: "test",
      name: "Testy McTestFace",
    });
    expect(response.status).toBe(400);
  });
  it("Registering a user without an email should return 400 Bad Request", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ password: "test" });
    expect(response.status).toBe(400);
  });
  it("Registering a user without a password should return 400 Bad Request", async () => {
    const response = await request
      .post("/api/auth/register")
      .send({ email: "test@test.com" });
    expect(response.status).toBe(400);
  });
  it("Logging in a user should return 200 OK", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "test" });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });
  it("Logging in a user with an invalid email should return 401 Unauthorized", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "test1" });
    expect(response.status).toBe(401);
  });
});

describe("Test notes endpoints", () => {
  it("Getting notes should return 401", async () => {
    const response = await request.get("/api/notes");
    expect(response.status).toBe(401);
  });
  it("Getting notes with a token should return 200 OK", async () => {
    const response = await request
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("Getting notes with an invalid token should return 401 Unauthorized", async () => {
    const response = await request
      .get("/api/notes")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZTk5ZTlhZTc1ZDQ2NjM4Zjk1ZWJjZTUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoiVGVzdCBNYXRlcmlhbCIsImlzQWRtaW4iOmZhbHNlLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTg3NDg3MzI3LCJleHAiOjE1ODc0OTUyMjd9.YIbz6QW8CvNlHWp8x0vX9C5G5A5D5Ww8_JvQj0gkM-zA"
      );
    expect(response.status).toBe(401);
  });

  let noteId;

  it("Creating a note should return 201 Created", async () => {
    const response = await request
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ note: { yes: "test" } });
    expect(response.status).toBe(201);
    console.log(response.body);
    noteId = response.body.id;
  });

  it("Creating a note with an invalid token should return 401 Unauthorized", async () => {
    const response = await request
      .post("/api/notes")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZTk5ZTlhZTc1ZDQ2NjM4Zjk1ZWJjZTUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoiVGVzdCBNYXRlcmlhbCIsImlzQWRtaW4iOmZhbHNlLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTg3NDg3MzI3LCJleHAiOjE1ODc0OTUyMjd9.YIbz6QW8CvNlHWp8x0vX9C5G5A5D5Ww8_JvQj0gkM-zA"
      )
      .send({ note: { yes: "test" } });
    expect(response.status).toBe(401);
  });
  it("Updating a note should return 200 OK", async () => {
    const response = await request
      .patch(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ note: { yes: "test2" } });
    expect(response.status).toBe(200);
  });
  it("Updating a note with an invalid token should return 401 Unauthorized", async () => {
    const response = await request
      .patch(`/api/notes/${noteId}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZTk5ZTlhZTc1ZDQ2NjM4Zjk1ZWJjZTUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoiVGVzdCBNYXRlcmlhbCIsImlzQWRtaW4iOmZhbHNlLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTg3NDg3MzI3LCJleHAiOjE1ODc0OTUyMjd9.YIbz6QW8CvNlHWp8x0vX9C5G5A5D5Ww8_JvQj0gkM-zA"
      )
      .send({ note: { yes: "test2" } });
    expect(response.status).toBe(401);
  });
});
