import { Request, Response } from "express";
import { schoolService } from "./school.services";
import { fail, success } from "../../utils/response.util";

export const step1 = async (req: Request, res: Response) => {
  try {
    const data = await schoolService.step1(req.body);
    return success(res, data, "Step 1 completed", 201);
  } catch (e: any) {
    return fail(res, e.message);
  }
};

export const step2 = async (req: Request, res: Response) => {
  try {
    const data = await schoolService.step2(
      req.params.schoolId as string,
      req.body,
    );
    return success(res, data, "Step 2 completed");
  } catch (e: any) {
    return fail(res, e.message);
  }
};

export const step3 = async (req: Request, res: Response) => {
  try {
    const data = await schoolService.step3(
      req.params.schoolId as string,
      req.body,
    );
    return success(res, data, "Step 3 completed");
  } catch (e: any) {
    return fail(res, e.message);
  }
};

export const step4 = async (req: Request, res: Response) => {
  try {
    const data = await schoolService.step4(
      req.params.schoolId as string,
      req.body,
    );
    return success(res, data, "Step 4 completed");
  } catch (e: any) {
    return fail(res, e.message);
  }
};

export const step5 = async (req: Request, res: Response) => {
  try {
    await schoolService.step5(req.params.schoolId as string, req.body);
    return success(res, null, "Step 5 completed");
  } catch (e: any) {
    return fail(res, e.message);
  }
};
