import { Router } from "express";

import admin from "./admin";
import auth from "./auth";
import not_found from "./not_found";
import reset_password from "./reset_password";
import user from "./user";

const router = Router();

router.use("/api/micro_users/auth", auth);
router.use("/api/micro_users/user", user);
router.use("/api/micro_users/admin", admin);
router.use("/api/micro_users/reset_password", reset_password);
router.use("/api/micro_users/*", not_found);

export default router;
