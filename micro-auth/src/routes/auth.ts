import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController"
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import { UserRole } from "../entity/User";

const auth = Router();

//admin controller 
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

//user controller
auth.post("/signup", UserController.signup);
// TODO Change to post and verify on FE
auth.get("/confirm_email/:token", UserController.email_validation);
auth.post("/resend_email", UserController.resend_email)
auth.put("/update_user/:id", UserController.updateUser)
auth.get("/get_user_id/:id", UserController.getUserByID)
auth.get("/get_user_email/:email", UserController.getUserByEmail)

//auth controller
auth.post("/signin", AuthController.signin);
auth.post("/refresh_token", AuthController.refreshToken);
auth.post("/signout", AuthController.signout);

auth.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default auth;
