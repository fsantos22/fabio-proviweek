import { User, USER_ROLE } from "../model/User";
import { userDB } from "./../fakeDatabase/user";

export class UserDatabase {
  public async signUp(user: User): Promise<void> {
    try {
      userDB.push({
        id: user.getId(),
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = userDB.find((user) => user.email === email);
      return User.toUserModel(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = userDB.find((user) => user.username === username);
      return User.toUserModel(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserById(id: string): Promise<User | undefined> {
    try {
      const user = userDB.find((user) => user.id === id);
      return User.toUserModel(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async resetPassword(id: string, password: string): Promise<void> {
    try {
      const index = userDB.findIndex((user) => user.id === id);
      userDB[index].password = password;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async resetEmail(id: string, email: string): Promise<void> {
    try {
      const index = userDB.findIndex((user) => user.id === id);
      userDB[index].email = email;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getAllUsers(userRole: USER_ROLE): Promise<any[]> {
    try {
      const result = [...userDB];
      if (userRole === USER_ROLE.ADMIN) {
        return result.reverse();
      }
      const users = result.reverse().map((user) => {
        return { username: user.username, email: user.email };
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserDatabase();
