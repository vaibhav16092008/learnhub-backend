import bcrypt from "bcrypt";
import { prisma } from "../../utils/static.util";

export const schoolService = {
  async step1(data: any) {
    const exists = await prisma.tenant.findUnique({
      where: { subdomain: data.subdomain },
    });
    if (exists) throw new Error("Subdomain already exists");

    return prisma.$transaction(async (tx: any) => {
      const tenant = await tx.tenant.create({
        data: {
          schoolName: data.name,
          subdomain: data.subdomain,
          plan: "FREE",
        },
      });

      const school = await tx.school.create({
        data: {
          tenantId: tenant.id,
          name: data.name,
          code: `SCH-${Date.now()}`,
          type: data.type,
          board: data.board,
          medium: data.medium,
          level: data.level,
          email: data.email,
          phone: data.phone,
          establishmentYear: data.establishmentYear,
          affiliationNumber: data.affiliationNumber,
          udiseCode: data.udiseCode,
          website: data.website,
        },
      });

      return { tenantId: tenant.id, schoolId: school.id };
    });
  },

  async step2(schoolId: string, data: any) {
    return prisma.address.upsert({
      where: { schoolId },
      update: data,
      create: { schoolId, ...data },
    });
  },

  async step3(schoolId: string, data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    return prisma.admin.create({
      data: {
        schoolId,
        name: data.name,
        role: data.role,
        phone: data.phone,
        email: data.email,
        username: data.username,
        password: hashed,
      },
    });
  },

  async step4(schoolId: string, data: any) {
    return prisma.academicInfo.create({
      data: {
        schoolId,
        academicYear: data.academicYear,
        sessionStart: data.sessionStart,
        sessionEnd: data.sessionEnd,
        gradingSystem: data.gradingSystem,
        examPattern: data.examPattern,
        passingMarks: data.passingMarks,
        classes: {
          create: data.classes.map((c: any) => ({
            name: c.name,
            sectionsCount: c.sectionsCount,
            sections: {
              create: Array.from({ length: c.sectionsCount }).map((_, i) => ({
                name: String.fromCharCode(65 + i),
              })),
            },
          })),
        },
        streams: {
          create: data.streams?.map((s: string) => ({ name: s })) || [],
        },
      },
    });
  },

  async step5(schoolId: string, data: any) {
    if (data.documents?.length) {
      await prisma.document.createMany({
        data: data.documents.map((d: any) => ({
          schoolId,
          type: d.type,
          fileUrl: d.fileUrl,
        })),
      });
    }

    if (data.bank) {
      await prisma.bankDetail.upsert({
        where: { schoolId },
        update: data.bank,
        create: { schoolId, ...data.bank },
      });
    }

    return true;
  },
};
