import { Router } from "express";
import { step1, step2, step3, step4, step5 } from "./school.controller";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "../../schema/school.schema";
import { validate } from "../../middlewares/validate.middleware";

const schoolRouter = Router();

schoolRouter.post("/step-1", validate(step1Schema), step1);
schoolRouter.post("/step-2/:schoolId", validate(step2Schema), step2);
schoolRouter.post("/step-3/:schoolId", validate(step3Schema), step3);
schoolRouter.post("/step-4/:schoolId", validate(step4Schema), step4);
schoolRouter.post("/step-5/:schoolId", validate(step5Schema), step5);

export default schoolRouter;
