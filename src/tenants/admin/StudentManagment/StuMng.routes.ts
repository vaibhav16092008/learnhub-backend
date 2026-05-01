import { Router } from "express";
import { authMiddleware } from "../../../core/middlewares/middleware";
import { tenantMiddleware } from "../../../core/middlewares/tenant.middleware";
import { createStudent, getStudents } from "./StuMng.controller";

const stuMngRouter = Router();

stuMngRouter.post("/", authMiddleware, tenantMiddleware, createStudent);

stuMngRouter.get("/", authMiddleware, tenantMiddleware, getStudents);

export default stuMngRouter;
R F q  e r  1`s`