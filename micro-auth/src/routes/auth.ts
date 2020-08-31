import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
const auth = Router();

auth.post("/signin", AuthController.signin);
auth.post("/signup", AuthController.signup);
auth.post("/refresh_token", AuthController.refreshToken);
auth.get("/get_all", [checkJwt, checkRole(["owner"])], AuthController.getAll);
auth.post("/signout", AuthController.signout);

auth.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found'})
});

export default auth;
