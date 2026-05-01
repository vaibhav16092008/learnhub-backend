import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),

  admissionNumber: z.string(),
  rollNumber: z.string().optional(),

  academicYearId: z.string(),
  classId: z.string(),
  sectionId: z.string(),

  dob: z.string(),
  gender: z.string(),

  fatherName: z.string().optional(),
  motherName: z.string().optional(),

  phone: z.string().optional(),
  address: z.string().optional(),
});
