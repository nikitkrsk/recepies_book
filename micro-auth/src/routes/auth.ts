import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController"
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import { UserRole } from "../entity/User";
import ResetPassController from "../controllers/ResetPasswordController";

const auth = Router();

// Admin controller 
auth.post(
  "/create_admin",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.create_admin
);
auth.post(
  "/user_promoted/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.user_promoted
);
auth.post(
  "/change_status/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.change_user_status
);
auth.delete("/delete/:id", [checkJwt], AdminController.delete_user);
auth.get("/get_all", AdminController.get_all);

// User controller
auth.post("/signup", UserController.signup);
// TODO Change to post and verify on FE
auth.get("/confirm_email/:token", UserController.email_validation);
auth.post("/resend_email", UserController.resend_email)
auth.put("/update_user/:id", UserController.updateUser)
auth.get("/get_user_id/:id", UserController.getUserByID)
auth.get("/get_user_email/:email", UserController.getUserByEmail)

// Auth controller
auth.post("/signin", AuthController.signin);
auth.post("/refresh_token", AuthController.refreshToken);
auth.post("/signout", AuthController.signout);

// Reset Password
auth.post("/forgot_password", ResetPassController.forgot_password);
auth.post("/reset_password/:token", ResetPassController.reset_password);
auth.get('/get_passwords_changes', ResetPassController.get_all_reset_password)


auth.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default auth;
