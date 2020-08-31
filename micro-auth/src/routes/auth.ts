import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import { UserRole } from "../entity/User";

const auth = Router();

//user controller
auth.post("/signup", UserController.signup);
auth.post(
  "/create_admin",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.create_admin
);
auth.get(
  "/user_promoted/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.user_promoted
);
auth.get(
  "/change_status/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.change_user_status
);
auth.delete("/delete/:id", [checkJwt], UserController.delete_user);
auth.get("/get_all", UserController.get_all);

//auth controller
auth.post("/signin", AuthController.signin);
auth.post("/refresh_token", AuthController.refreshToken);
auth.post("/signout", AuthController.signout);

auth.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default auth;
