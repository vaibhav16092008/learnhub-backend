import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./plateform/auth/auth.route";
import schoolRouter from "./plateform/schools/school.route";
import { authMiddleware } from "./core/middlewares/middleware";
import tenantRouter from "./tenants/auth/auth.route";
import stuMngRouter from "./tenants/admin/StudentManagment/StuMng.routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/super-admin", authRouter);
app.use("/api/super-admin/schools", authMiddleware, schoolRouter);

app.use("/api/school", tenantRouter);
app.use("/api/school/students", stuMngRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
