import { UserDatabase } from "../src/data/UserDatabase";
import { Authenticator } from "../src/services/Authenticator";
import { UserBusiness } from "./../src/business/UserBusiness";
import authenticatorMock from "./mocks/authenticatorMock";
import hashManagerMock from "./mocks/hashManagerMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import userDatabaseMock from "./mocks/userDatabaseMock";

const userBusiness = new UserBusiness(
  idGeneratorMock,
  authenticatorMock as Authenticator,
  hashManagerMock,
  userDatabaseMock as UserDatabase
);

describe("SignUp", () => {
  it("Should throw error when username is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        username: "",
        email: "normal@provi.com",
        password: "123456",
        role: "normal",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when email is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        username: "normal",
        email: "",
        password: "123456",
        role: "normal",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        username: "normal",
        email: "normal@provi.com",
        password: "",
        role: "normal",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is invalid", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        username: "normal",
        email: "normal@provi.com",
        password: "123*456",
        role: "normal",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Password must be at least 6 characters with letters and/or numbers and/or @,&,#,!"
      );
    }
  });

  it("Should throw error when role is invalid", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        username: "normal",
        email: "normal@provi.com",
        password: "123456",
        role: "invalid",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Invalid user role. Choose between 'NORMAL' or 'ADMIN'"
      );
    }
  });

  it("Success", async () => {
    expect.assertions(1);
    try {
      const token = await userBusiness.signUp({
        username: "normal",
        email: "normal@provi.com",
        password: "123456",
        role: "NORMAL",
      });

      expect(token).toBeDefined();
    } catch (error) {}
  });
});

describe("login", () => {
  it("Should throw error when username is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({
        username: "",
        password: "hash",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({
        username: "normal",
        password: "",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when username is not found", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({
        username: "blabla",
        password: "hash",
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Invalid credentials");
    }
  });

  it("Should throw error when password is incorrect", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({
        username: "normal",
        password: "blabla",
      });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Invalid credentials");
    }
  });

  it("Success", async () => {
    expect.assertions(1);
    try {
      const token = await userBusiness.login({
        username: "normal",
        password: "hash",
      });
      expect(token).toBeDefined();
    } catch (error) {}
  });
});

describe("resetPassword", () => {
  it("Should throw error when id is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.resetPassword({
        id: "",
        oldPassword: "123456",
        newPassword: "654321",
        newPassword2: "654321",
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when oldPassword is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.resetPassword({
        id: "id-normal",
        oldPassword: "",
        newPassword: "654321",
        newPassword2: "654321",
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when newPassword is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.resetPassword({
        id: "id-normal",
        oldPassword: "123456",
        newPassword: "",
        newPassword2: "654321",
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when newPassword2 is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.resetPassword({
        id: "id-normal",
        oldPassword: "123456",
        newPassword: "654321",
        newPassword2: "",
        token: "NORMAL",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Success", async () => {
    expect.assertions(0);
    try {
      await userBusiness.resetPassword({
        id: "4d49189a-d017-46b8-8268-a1396a1a6562",
        oldPassword: "hash",
        newPassword: "654321",
        newPassword2: "654321",
        token: "NORMAL",
      });
    } catch (error) {}
  });
});
