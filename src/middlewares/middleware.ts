import { NextFunction, Request, Response } from "express";
import { errorMessage, verifyToken } from "../utils/static.util";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorMessage({
        message: "Authorization header missing or malformed",
        statusCode: 401,
        res,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    console.log("decoded", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return errorMessage({
      message: "Invalid or expired token",
      statusCode: 401,
      res,
    });
  }
};
