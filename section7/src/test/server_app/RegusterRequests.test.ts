import { DataBase } from "../../app/server_app/data/DataBase";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { RequestTestWrapper } from "./test utils/RequestTestWrapper";
import { ResponseTestWrapper } from "./test utils/ResponseTestWrapper";

jest.mock("../../app/server_app/data/DataBase");

const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
  listen: () => {},
  close: () => {},
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestWrapper, responseWrapper);
    return fakeServer;
  },
}));

describe("Register requests test suite", () => {
  afterEach(() => {
    requestWrapper.clearFields();
    responseWrapper.clearFields();
  });

  it("should register new users", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.body = {
      userName: "name",
      password: "password",
    };
    requestWrapper.url = "localhost:8080/register";
    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseWrapper.body).toEqual(
      expect.objectContaining({ userId: expect.any(String) })
    );
    // expect(responseWrapper.body).toHaveProperty("userId");
  });

  it("should reject requests with no userName and pw ", async () => {
    requestWrapper.method = HTTP_METHODS.POST;
    requestWrapper.body = {};
    requestWrapper.url = "localhost:8080/register";

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseWrapper.body).toBe("userName and password required");
    // expect(responseWrapper.body).toHaveProperty("userId");
  });

  it("should do nothing for not supported methods", async () => {
    requestWrapper.method = HTTP_METHODS.DELETE;
    requestWrapper.body = {};
    requestWrapper.url = "localhost:8080/register";

    await new Server().startServer();

    await new Promise(process.nextTick);

    expect(responseWrapper.statusCode).toBe(undefined);
    expect(responseWrapper.body).toBe(undefined);
    // expect(responseWrapper.body).toHaveProperty("userId");
  });
});
