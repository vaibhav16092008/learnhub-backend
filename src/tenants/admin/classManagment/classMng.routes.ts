import { Router } from "express";
import { authMiddleware } from "../../../core/middlewares/middleware";
import { tenantMiddleware } from "../../../core/middlewares/tenant.middleware";

const classMngRouter = Router();

classMngRouter.get("/", authMiddleware, tenantMiddleware);

export default classMngRouter;
