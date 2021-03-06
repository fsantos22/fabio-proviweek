import { User, USER_ROLE } from "../../src/model/User";
import { adminUserMock, normalUserMock } from "./userMocks";

export class UserDatabaseMock {
  public async signUp(user: User): Promise<void> {
    try {

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      if(email === "normal@provi.com"){
        return User.toUserModel(normalUserMock);
      }
      if (email === "admin@provi.com") {
        return User.toUserModel(adminUserMock);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      if (username === "normal") {
        return User.toUserModel(normalUserMock);
      }
      if (username === "admin") {
        return User.toUserModel(adminUserMock);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserById(id: string): Promise<User | undefined> {
    try {
      if (id === "id-normal") {
        return User.toUserModel(normalUserMock);
      }
      if (id === "id-admin") {
        return User.toUserModel(adminUserMock);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async resetPassword(id: string, password: string): Promise<void> {
    try {

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async resetEmail(id: string, email: string): Promise<void> {
    try {

    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getAllUsers(userRole: USER_ROLE): Promise<any[]> {
    try {
      const result = [normalUserMock, adminUserMock];
      if(userRole === USER_ROLE.ADMIN){
        return result
      }
      const users = result.reverse().map((user) => {
        return { username: user.getUsername(), email: user.getEmail() };
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserDatabaseMock();
