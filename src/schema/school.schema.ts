import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(3),
  subdomain: z.string().regex(/^[a-z0-9-]+$/),
  type: z.enum(["PUBLIC", "PRIVATE", "TRUST", "INTERNATIONAL"]),
  board: z.enum(["CBSE", "ICSE", "STATE", "IB", "CAMBRIDGE", "OTHER"]),
  medium: z.enum(["ENGLISH", "HINDI", "BOTH", "OTHER"]),
  level: z.enum(["PRIMARY", "SECONDARY", "SR_SECONDARY"]),
  email: z.string().email(),
  phone: z.string().min(10),
  establishmentYear: z.number().optional(),
  affiliationNumber: z.string().optional(),
  udiseCode: z.string().optional(),
  website: z.string().url().optional(),
});

export const step2Schema = z.object({
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string(),
  district: z.string().optional(),
  state: z.string(),
  pincode: z.string().min(5),
  country: z.string().default("India"),
  landmark: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  transportAvailable: z.boolean().optional(),
  hostelAvailable: z.boolean().optional(),
});

export const step3Schema = z
  .object({
    name: z.string(),
    role: z.enum(["OWNER", "PRINCIPAL", "DIRECTOR", "ADMIN"]),
    phone: z.string().min(10),
    email: z.string().email(),
    username: z.string().min(4),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const step4Schema = z.object({
  academicYear: z.string(),
  sessionStart: z.coerce.date(),
  sessionEnd: z.coerce.date(),
  gradingSystem: z.string(),
  examPattern: z.string().optional(),
  passingMarks: z.number().optional(),
  classes: z.array(
    z.object({
      name: z.string(),
      sectionsCount: z.number().min(1).default(1),
    }),
  ),
  streams: z.array(z.string()).optional(),
});

export const step5Schema = z.object({
  documents: z
    .array(
      z.object({
        type: z.string(),
        fileUrl: z.string().url(),
      }),
    )
    .optional(),
  bank: z
    .object({
      accountName: z.string(),
      accountNumber: z.string(),
      ifscCode: z.string(),
      bankName: z.string(),
      cancelledCheque: z.string().optional(),
    })
    .optional(),
});
