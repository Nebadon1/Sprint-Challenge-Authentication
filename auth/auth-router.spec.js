const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");

// describe("GET /", () => {
//   it('has process.env.DB_ENV as "testing"', () => {
//     expect(process.env.DB_ENV).toBe("testing");
//   });
// });

describe("POST /register", () => {
  it("should return JSON", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Sprint",
        password: "123456"
      })
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });

  it("should return 200", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Sprint",
        password: "123456"
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
