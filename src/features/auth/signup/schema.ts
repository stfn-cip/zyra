import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: (iss) => {
        return `Name must have ${iss.minimum} characters or more`;
      },
    })
    .max(30, {
      error: (iss) => {
        return `Name cannot exceed ${iss.maximum} characters`;
      },
    })
    .regex(/^[a-zA-ZÀ-ÿ' -]+$/, {
      message:
        "Name can only contain letters, spaces, dashes, and apostrophes",
    }),
  email: z.email(),
  password: z
    .string()
    .min(8, {
      error: (iss) => {
        return `Password must have ${iss.minimum} characters or more`;
      },
    })
    .max(64, {
      error: (iss) => {
        return `Password cannot exceed ${iss.maximum} characters`;
      },
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        "Password must contain at least an uppercase letter, a lowercase letter, and a number",
    }),
  confirmPassword: z
    .string()
    .max(100, {
      error: (iss) => {
        return `Password cannot exceed ${iss.maximum} characters`;
      },
    }),
});
