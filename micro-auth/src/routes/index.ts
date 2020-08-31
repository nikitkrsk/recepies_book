import { Router } from "express";

import auth from "./auth";

const router = Router();

router.use("/api/auth", auth);

export default router;
