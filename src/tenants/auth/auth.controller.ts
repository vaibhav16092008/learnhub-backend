import { Request, Response } from "express";
import { tenantLogin } from "./auth.services";
import { success, fail } from "../../core/utils/response.util";

export const loginController = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await tenantLogin({
      tenantId: req.tenantId,
      email,
      password,
    });

    return success(res, data, "Login successful");
  } catch (error: any) {
    return fail(res, error.message);
  }
};
