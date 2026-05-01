import { studentService } from "./StuMng.services";

export const createStudent = async (req: any, res: any) => {
  try {
    const data = await studentService.createStudent(req.tenantId, req.body);

    return res.json({
      success: true,
      message: "Student created",
      data,
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const getStudents = async (req: any, res: any) => {
  try {
    const data = await studentService.getStudents(req.tenantId, req.query);

    return res.json({
      success: true,
      data,
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
