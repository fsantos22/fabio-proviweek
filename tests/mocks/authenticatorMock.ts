import { CustomError } from "../../src/error/CustomError";

export class AuthenticatorMock {
  public generateToken(input: AuthenticationData): string {
    return "token";
  }

  public getData(token: string): AuthenticationData {
    if (!token) {
      throw new CustomError(401, "Unauthorized!");
    }
    let result: AuthenticationData;
    if (token === "ADMIN") {
      result= {
        id: "id-admin",
        role: "ADMIN",
      };
    }
    else if (token === "NORMAL2") {
      result = {
        id: "id-normal2",
        role: "NORMAL",
      };
    }
    else {
      result = {
        id: "id-normal",
        role: "NORMAL",
      };
    }
    return result; 
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}

export default new AuthenticatorMock();
