import { PasswordChecker, PasswordErrors } from "../app/PasswordChecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password <8 chars is invalid", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("Password >=8 chars is ok", () => {
    const actual = sut.checkPassword("12345678");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    // expect(actual.valid).toBe(true); not checking because it might be invalid for other reasons
  });

  it("Password without uppercase is invalid", () => {
    const actual = sut.checkPassword("abcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE);
  });
  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("Abcd");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
  });

  it("Password without lowercase is invalid", () => {
    const actual = sut.checkPassword("1234ABCD");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE);
  });
  it("Password with lowercase is valid", () => {
    const actual = sut.checkPassword("1234ABCDa");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
  });
  it("Complex password is valid", () => {
    const actual = sut.checkPassword("1234ABCDa");
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });

  it("admin pw with no number is invalid", () => {
    const actual = sut.checkAdminPassword("aaaaABCD");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it("admin Password with number is valid", () => {
    const actual = sut.checkPassword("1234ABCDa");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
