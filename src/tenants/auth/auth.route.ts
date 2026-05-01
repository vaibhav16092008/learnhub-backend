import { Router } from "express";
import { loginController } from "./auth.controller";
import { tenantMiddleware } from "../../core/middlewares/tenant.middleware";

const tenantRouter = Router();

tenantRouter.post("/login", tenantMiddleware, loginController);

export default tenantRouter;
