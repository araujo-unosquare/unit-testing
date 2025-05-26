import { getRequestBody } from "../../../app/server_app/utils/Utils";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";

const requestMock = {
  on: jest.fn(),
};

const someObject = {
  name: "Carlos",
  age: 31,
  city: "Merida",
};

const someObjectAsString = JSON.stringify(someObject);

describe.only("test getRequestBody", () => {
  it("should return object for valid json", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb(someObjectAsString);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(requestMock as any as IncomingMessage);

    expect(actual).toEqual(someObject);
  });

  it("should throw error for invalid json", async () => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb("a" + someObjectAsString);
      } else {
        cb();
      }
    });

    await expect(getRequestBody(requestMock as any)).rejects.toThrow();
  });

  it("should throw error for unexpected error", async () => {
    const someError = new Error("Something went wrong");
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "error") {
        cb(someError);
      }
    });
    await expect(getRequestBody(requestMock as any)).rejects.toThrow(
      someError.message
    );
  });
});
