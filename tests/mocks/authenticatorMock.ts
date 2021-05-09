import { CustomError } from "../../src/error/CustomError";

export class AuthenticatorMock {
  public generateToken(input: AuthenticationData): string {
    return "token";
  }

  public getData(token: string): AuthenticationData {
    if (!token) {
      throw new CustomError(401, "Unauthorized!");
    }
    if (token === "ADMIN") {
      return {
        id: "id-admin",
        role: "ADMIN",
      };
    } else {
      return {
        id: "id-normal",
        role: "NORMAL",
      };
    }
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}

export default new AuthenticatorMock();
