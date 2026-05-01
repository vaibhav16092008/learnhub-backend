import { generateToken, prisma } from "../../core/utils/static.util";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  const match = user.password === password;
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ userId: user.id });
  return {
    token,
    user,
  };
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  return user;
};
