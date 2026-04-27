import { Response } from "express";

export function success(
  res: Response,
  data: any,
  message = "OK",
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function fail(
  res: Response,
  message = "Bad Request",
  statusCode = 400,
  errors?: any,
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
