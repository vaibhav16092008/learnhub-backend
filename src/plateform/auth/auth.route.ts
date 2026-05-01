import { Router } from "express";
import { getProfileController, loginController } from "./auth.controller";
import { authMiddleware } from "../../core/middlewares/middleware";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.get("/profile", authMiddleware, getProfileController);

export default authRouter;
