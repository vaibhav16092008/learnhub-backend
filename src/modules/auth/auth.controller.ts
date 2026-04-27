import { NextFunction, Request, Response } from "express";
import { getProfile, login } from "./auth.services";
import { errorMessage, successMessage } from "../../utils/static.util";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const data = await login({ email, password });

    return successMessage({
      message: "Login successful",
      data,
      statusCode: 200,
      res,
    });
  } catch (error: any) {
    return errorMessage({
      message: error.message || "Login failed",
      statusCode: 401,
      res,
    });
  }
};
const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getProfile((req as any).user.userId);
    return successMessage({
      message: "Profile fetched successfully",
      data,
      statusCode: 200,
      res,
    });
  } catch (error: any) {
    return errorMessage({
      message: error.message || "Profile fetch failed",
      statusCode: 401,
      res,
    });
  }
};

export { loginController, getProfileController };
