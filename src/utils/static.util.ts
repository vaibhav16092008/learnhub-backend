import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { Response } from "express";
import jwt from "jsonwebtoken";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const errorMessage = ({
  message = "An error occurred",
  statusCode = 500,
  res,
  data = null,
}: {
  message: string;
  statusCode: number;
  res: Response;
  data?: any;
}) => {
  return res.status(statusCode).json({
    message,
    statusCode,
    ...(data && { data }),
  });
};

export const successMessage = ({
  message = "Success",
  data = null,
  statusCode = 200,
  res,
}: {
  message: string;
  data: any;
  statusCode: number;
  res: Response;
}) => {
  return res.status(statusCode).json({
    message,
    data,
    statusCode,
  });
};
