const request = require("supertest");
const { app, server } = require("../server");
let pgp = require("pg-promise");
const mockDb = jest.mock("pg-promise")();
mockDb.none = jest.fn();

describe("test create user", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  test("create and return user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "test name",
      email: "test-email1@test.com",
      password: "password123",
    });
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("role");
    expect(res.body).toHaveProperty("token");
  });
});
