import { CustomError } from "../error/CustomError";

export class User {
  constructor(
    private id: string,
    private username: string,
    private email: string,
    private password: string,
    private role: USER_ROLE = USER_ROLE.NORMAL
  ) {}

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }

  setId(id: string) {
    this.id = id;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setRole(role: USER_ROLE) {
    this.role = role;
  }

  static stringToUSER_ROLE(input: string): USER_ROLE {
    if (input) {
      switch (input?.toUpperCase()) {
        case "NORMAL":
          return USER_ROLE.NORMAL;
        case "ADMIN":
          return USER_ROLE.ADMIN;
        default:
          throw new CustomError(
            422,
            "Invalid user role. Choose between 'NORMAL' or 'ADMIN'"
          );
      }
    } else {
      return USER_ROLE.NORMAL;
    }
  }

  static toUserModel(user?: any): User | undefined {
    return (
      user &&
      new User(
        user.id,
        user.username,
        user.email,
        user.password,
        User.stringToUSER_ROLE(user.role)
      )
    );
  }
}

export interface UserInputDTO {
  username: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export interface LoginInputDTO {
  username: string;
  password: string;
}

export interface resetPasswordInputDTO {
  id: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  token: string;
}

export interface resetEmailInputDTO {
  id: string;
  newEmail: string;
  token: string;
}

export enum USER_ROLE {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export const validateUsername = (username:string):boolean => {
  const regex = /^[a-z0-9_]*$/
  return regex.test(username)
}

export const validateEmail = (email: string):boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validatePassword = (password:string):boolean => {
    const regex = /^[^*|\":<>[\]{}`\\/()';\s]+$/;
    return regex.test(password);
}
