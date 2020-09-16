import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import ResetPassController from "../controllers/ResetPasswordController";

const user = Router();

// User controller
user.post("/signup", UserController.signup);
// TODO Change to post and verify on FE
user.get("/confirm_email/:token", UserController.email_validation);
user.post("/resend_email", UserController.resend_email)
user.put("/update_user/:id", UserController.updateUser)
user.get("/get_user_id/:id", UserController.getUserByID)
user.get("/get_user_email/:email", UserController.getUserByEmail)

export default user;
