import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../core/utils/static.util";

const JWT_SECRET = process.env.JWT_SECRET!;

export const tenantLogin = async ({
  tenantId,
  email,
  password,
}: {
  tenantId: string;
  email: string;
  password: string;
}) => {
  const user = await prisma.tenantUser.findFirst({
    where: {
      email,
      tenantId,
      isActive: true,
    },
  });

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};
