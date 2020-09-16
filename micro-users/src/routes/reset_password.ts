import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController"
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import { UserRole } from "../entity/User";
import ResetPassController from "../controllers/ResetPasswordController";

const reset_password = Router();

// Reset Password
reset_password.post("/forgot_password", ResetPassController.forgot_password);
reset_password.post("/reset_password/:token", ResetPassController.reset_password);
reset_password.get('/get_passwords_changes', ResetPassController.get_all_reset_password)


export default reset_password;
