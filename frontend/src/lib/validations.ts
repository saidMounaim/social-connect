import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
