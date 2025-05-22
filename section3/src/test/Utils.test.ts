import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  describe("StringUtils tests", () => {
    let sut: StringUtils;

    beforeEach(() => {
      console.log("Setup");
      sut = new StringUtils();
    });

    afterEach(() => {
      // clear mocks
      console.log("tear down");
    });

    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");

      expect(actual).toBe("ABC");
    });

    it("Should throw error on invalid argument -function", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }

      expect(expectError).toThrow();
      expect(expectError).toThrow("Invalid arg");
    });

    it("Should throw error on invalid argument - arrow", () => {
      expect(() => {
        const actual = sut.toUpperCase("");
      }).toThrow("Invalid arg");
    });

    it("Should throw error on invalid argument - try catch", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid arg");
        done();
      }
    });
  });
});
