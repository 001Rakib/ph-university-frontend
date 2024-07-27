import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a value" }),
  year: z.string({ required_error: "Please select a value" }),
  startMonth: z.string({ required_error: "Please select a value" }),
  endMonth: z.string({ required_error: "Please select a value" }),
});
