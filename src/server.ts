import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./modules/auth/auth.route";
import schoolRouter from "./modules/schools/school.route";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/super-admin", authRouter);
app.use("/api/super-admin/schools", schoolRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
