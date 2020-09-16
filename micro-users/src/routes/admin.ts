import { Router, Request, Response } from "express";
import AdminController from "../controllers/AdminController"
import { checkJwt } from "../middlewares/jwt_check";
import { checkRole } from "../middlewares/role_check";
import { UserRole } from "../entity/User";

const admin = Router();

// Admin controller 
admin.post(
  "/create_admin",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.create_admin
);
admin.post(
  "/user_promoted/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.user_promoted
);
admin.post(
  "/change_status/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  AdminController.change_user_status
);
admin.delete("/delete/:id", [checkJwt], AdminController.delete_user);
admin.get("/get_all", AdminController.get_all);



export default admin;
