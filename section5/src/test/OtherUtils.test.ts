import {
  calculateComplexity,
  OtherStringUtils,
  toUpperCaseWithCb,
} from "../app/OtherUtils";

describe.skip("OtherUtils test suite", () => {
  // stub
  it("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someinfo",
        field2: "someotherinfo",
      },
    };
    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });

  // fakes - simplified versions of external svc
  it("ToUpperCase - calls cb for invalid arg", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls cb for valid arg", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  //mock
  describe("Tracking callbacks", () => {
    let cbArgs = [];
    let timesCalled = 0;
    function cbMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }
    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });
    it("ToUpperCase - calls cb for invalid arg - track calls", () => {
      const actual = toUpperCaseWithCb("", cbMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("invalid arg");
      expect(timesCalled).toBe(1);
    });

    it("ToUpperCase - calls cb for valid arg - track calls", () => {
      const actual = toUpperCaseWithCb("abc", cbMock);
      expect(actual).toBe("ABC");
      expect(timesCalled).toBe(1);
    });
  });

  // jest mock
  describe("Tracking cb with jest mock", () => {
    const cbMock = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("ToUpperCase - calls cb for invalid arg - track calls", () => {
      const actual = toUpperCaseWithCb("", cbMock);
      expect(actual).toBeUndefined();
      expect(cbMock).toHaveBeenCalledWith("invalid arg");
      expect(cbMock).toHaveBeenCalledTimes(1);
    });

    it("ToUpperCase - calls cb for valid arg - track calls", () => {
      const actual = toUpperCaseWithCb("abc", cbMock);
      expect(actual).toBe("ABC");
      expect(cbMock).toHaveBeenCalledWith("called function with abc");
      expect(cbMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("use spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("aaa");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("aaa");
    });

    test("use spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    test.skip("use spy to replace implementation of a method", () => {
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mock implementation");
      });
      //sut.callExternalService();
    });
  });
});
