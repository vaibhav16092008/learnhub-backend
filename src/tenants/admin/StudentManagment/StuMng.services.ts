import bcrypt from "bcrypt";
import { prisma } from "../../../core/utils/static.util";

export const studentService = {
  async createStudent(tenantId: string, data: any) {
    return prisma.$transaction(async (tx) => {
      // 1. check academic year belongs to tenant
      const academic = await tx.academicYear.findFirst({
        where: { id: data.academicYearId, tenantId },
      });

      if (!academic) throw new Error("Invalid academic year");

      // 2. create user
      const hashed = await bcrypt.hash("123456", 10);

      const user = await tx.tenantUser.create({
        data: {
          tenantId,
          name: data.name,
          email: data.email,
          password: hashed,
          role: "STUDENT",
          username: data.username,
        },
      });

      // 3. create student
      const student = await tx.student.create({
        data: {
          tenantId,
          userId: user.id,
          admissionNumber: data.admissionNumber,
          rollNumber: data.rollNumber,
          academicYearId: data.academicYearId,
          classId: data.classId,
          sectionId: data.sectionId,
          dob: new Date(data.dob),
          gender: data.gender,
          fatherName: data.fatherName,
          motherName: data.motherName,
          phone: data.phone,
          address: data.address,
        },
      });

      return { user, student };
    });
  },

  async getStudents(tenantId: string, query: any) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);

    const [data, total] = await Promise.all([
      prisma.student.findMany({
        where: { tenantId },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true,
          class: true,
          section: true,
          academicYear: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.student.count({ where: { tenantId } }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
