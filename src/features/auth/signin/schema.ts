import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(3, {
      error: (iss) => `Password must have ${iss.minimum} characters or more`,
    })
    .max(30, {
      error: (iss) => `Password cannot exceed ${iss.maximum} characters`,
    })
    .regex(/^(?!.*[<>&]).*$/, "Password cannot contain <, >, or & characters"),
});
