import { prisma } from "../utils/static.util";

export const tenantMiddleware = async (req: any, res: any, next: any) => {
  try {
    const host = req.headers.host;
    const subdomain = host.split(".")[0];

    const tenant = await prisma.tenant.findUnique({
      where: { subdomain },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }
    req.tenantId = tenant.id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tenant resolution failed",
    });
  }
};
