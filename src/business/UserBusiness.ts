import {
  UserInputDTO,
  LoginInputDTO,
  validatePassword,
  User,
  newPasswordInputDTO,
  resetPasswordInputDTO,
  resetEmailInputDTO,
  validateUsername,
} from "../model/User";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import hashManager, { HashManager } from "../services/HashManager";
import authenticator, { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { validateEmail } from "./../model/User";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

  async signUp(user: UserInputDTO) {
    try {
      const { username, email, password, role } = user;

      if (!username || !email || !password) {
        throw new CustomError(422, "Missing input");
      }

      if (!validateUsername(username)) {
        throw new CustomError(
          422,
          "Invalid username. User just lowercase letters, numbers or _"
        );
      }

      if (username.length < 3) {
        throw new CustomError(422, "username must be at lest 3 characters");
      }

      if (!validateEmail(email)) {
        throw new CustomError(422, "Invalid e-mail type");
      }

      if (!validatePassword(password) || password.length < 6) {
        throw new CustomError(
          422,
          "Password must be at least 6 characters with letters and/or numbers and/or @,&,#,!"
        );
      }

      const findUsername = await userDatabase.getUserByUsername(username);
      if (findUsername) {
        throw new CustomError(409, "Username is already in use");
      }

      const findEmail = await userDatabase.getUserByEmail(email);
      if (findEmail) {
        throw new CustomError(409, "Email is already in use");
      }

      const id = this.idGenerator.generate();

      const hashPassword = await this.hashManager.hash(user.password);

      await this.userDatabase.signUp(
        new User(
          id,
          username,
          email,
          hashPassword,
          User.stringToUSER_ROLE(role)
        )
      );

      const token = this.authenticator.generateToken({
        id,
        role,
      });
      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async login(user: LoginInputDTO) {
    try {
      const { username, password } = user;
      if (!username || !password) {
        throw new CustomError(422, "Missing input");
      }
      const userFromDB = await this.userDatabase.getUserByUsername(username);

      if (!userFromDB) {
        throw new CustomError(401, "Invalid credentials");
      }

      const hashCompare = await this.hashManager.compare(
        user.password,
        userFromDB.getPassword()
      );

      if (!hashCompare) {
        throw new CustomError(401, "Invalid credentials");
      }

      const token = this.authenticator.generateToken({
        id: userFromDB.getId(),
        role: userFromDB.getRole(),
      });

      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async resetPassword(input: resetPasswordInputDTO): Promise<void> {
    try {
      const { id, oldPassword, newPassword, newPassword2 } = input;

      if (!id || !oldPassword || !newPassword || !newPassword2) {
        throw new CustomError(422, "Missing input");
      }

      const tokenData = authenticator.getData(input.token);

      if (id !== tokenData.id) {
        throw new CustomError(401, "Unauthorized");
      }

      const userFromDB = await this.userDatabase.getUserById(id);
      if (!userFromDB) {
        throw new CustomError(404, "User not found");
      }

      const hashCompare = await this.hashManager.compare(
        input.oldPassword,
        userFromDB.getPassword()
      );
      if (!hashCompare) {
        throw new CustomError(422, "Invalid password");
      }

      if (newPassword !== newPassword2) {
        throw new CustomError(422, "New password does not match");
      }

      const newHashPassword = await this.hashManager.hash(newPassword);

      await userDatabase.resetPassword(id, newHashPassword);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async newPassword(input: newPasswordInputDTO): Promise<void> {
    try {
      const { id, newPassword, newPassword2 } = input;

      if (!id || !newPassword || !newPassword2) {
        throw new CustomError(422, "Missing input");
      }

      const tokenData = authenticator.getData(input.token);

      if (tokenData.role !== "ADMIN") {
        throw new CustomError(401, "Unauthorized");
      }

      const userFromDB = await this.userDatabase.getUserById(id);
      if (!userFromDB) {
        throw new CustomError(404, "User not found");
      }

      if (newPassword !== newPassword2) {
        throw new CustomError(422, "New password does not match");
      }

      const newHashPassword = await this.hashManager.hash(newPassword);

      await userDatabase.resetPassword(id, newHashPassword);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async resetEmail(user: resetEmailInputDTO): Promise<void> {
    try {
      const { id, newEmail } = user;
      const tokenData = authenticator.getData(user.token);

      if (!newEmail) {
        throw new CustomError(422, "Missing input");
      }

      if (id !== tokenData.id && tokenData.role !== "ADMIN") {
        throw new CustomError(401, "Unauthorized");
      }

      const userFromDB = await this.userDatabase.getUserById(id);
      if (!userFromDB) {
        throw new CustomError(404, "User not found");
      }

      if (!validateEmail(newEmail)) {
        throw new CustomError(422, "Invalid e-mail type");
      }

      await userDatabase.resetEmail(id, newEmail);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getAllUsers(token: any): Promise<any[]> {
    try {
      const tokenData = authenticator.getData(token);
      const userRole = User.stringToUSER_ROLE(tokenData.role);

      const usersFromDB = await this.userDatabase.getAllUsers(userRole);

      return usersFromDB;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new UserBusiness(
  idGenerator,
  authenticator,
  hashManager,
  userDatabase
);
