import { Request, Response } from "express";
import {
  UserInputDTO,
  LoginInputDTO,
  resetPasswordInputDTO,
  resetEmailInputDTO,
} from "../model/User";
import userBusiness from "../business/UserBusiness";

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;

      const input: UserInputDTO = { username, email, password, role };

      const token = await userBusiness.signUp(input);

      res.status(201).send({ token });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const input: LoginInputDTO = { username, password };

      const token = await userBusiness.login(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { id, oldPassword, newPassword, newPassword2 } = req.body;
      const token = req.headers.authorization as string;

      const input: resetPasswordInputDTO = {
        id,
        oldPassword,
        newPassword,
        newPassword2,
        token,
      };

      await userBusiness.resetPassword(input);

      res
        .status(201)
        .send({ message: "Password successfully changed!" });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  }

  async resetEmail(req: Request, res: Response) {
    try {
      const { id, newEmail } = req.body;
      const token = req.headers.authorization!

      const input: resetEmailInputDTO = { id, newEmail, token };

      await userBusiness.resetEmail(input)

      res.status(200).send({ message: "E-mail successfully changed!" });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!
      const result = await userBusiness.getAllUsers(token);
      res.status(200).send({ Users: result });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  }
}
