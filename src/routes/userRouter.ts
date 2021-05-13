import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.put("/reset-email", userController.resetEmail);
userRouter.put("/reset-password", userController.resetPassword);
userRouter.put("/new-password", userController.newPassword);
userRouter.get("/all", userController.getAllUsers);