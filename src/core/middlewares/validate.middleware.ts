import { ZodError, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { fail } from "../utils/response.util";

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return fail(res, "Validation error", 422, e.flatten());
      }
      return fail(res, "Invalid payload", 422);
    }
  };
