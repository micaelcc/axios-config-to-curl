import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { CurlGenerator } from "./CurlGenerator.js";

describe("CurlGenerator Unit Test", () => {
  const MOCK_INPUT_WITH_BODY = {
    baseURL: "https://api.test",
    url: "/users/1",
    method: "put",
    headers: {
      Authorization: "Bearer token",
      "Content-Type": "application/json",
    },
    data: {
      name: "any_name",
      mail: "any@mail.com",
      role: "any_role",
    },
  };

  const MOCK_INPUT_WITH_PARAMS = {
    baseURL: "https://api.test",
    url: "/users",
    method: "get",
    headers: {
      Authorization: "Bearer token",
      "Content-Type": "application/json",
    },
    params: {
      name: "any_name",
      city: "any_city",
      roles: ["any_role1", "any_role2"],
    },
  };

  it("input with body", () => {
    const sut = new CurlGenerator(MOCK_INPUT_WITH_BODY);

    const curl = sut.generate();

    strictEqual(
        curl, 
        `curl --location --request PUT "https://api.test/users/1" --header 'Authorization: Bearer token' --header 'Content-Type: application/json'  --data '{"name":"any_name","mail":"any@mail.com","role":"any_role"}'`
    );
  });

  it("input with url params", () => {
    const sut = new CurlGenerator(MOCK_INPUT_WITH_PARAMS);

    const curl = sut.generate();

    strictEqual(
        curl,
        `curl --location --request GET "https://api.test/users?name=any_name&city=any_city&roles=any_role1&roles=any_role2" --header 'Authorization: Bearer token' --header 'Content-Type: application/json'`
    )
  });
});
