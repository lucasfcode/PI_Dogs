/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Breed, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));

    it("GET responde con un array", function () {
      agent.get("/dogs").expect("Content-Type", /json/);
    });
  });
});
