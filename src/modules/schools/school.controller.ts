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

export const getSchools = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  try {
    const data = await schoolService.getSchools({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
      search: search as string,
    });
    return success(res, data, "All Schools Fetched Successfully!!");
  } catch (error: any) {
    return fail(res, error.message);
  }
};

export const getSchoolById = async (req: Request, res: Response) => {
  try {
    const data = await schoolService.getSchoolById(
      req?.params?.schoolId as string,
    );
    return success(res, data, "All Schools Fetched Successfully!!");
  } catch (error: any) {
    console.log("error", error);
    return fail(res, error.message);
  }
};
