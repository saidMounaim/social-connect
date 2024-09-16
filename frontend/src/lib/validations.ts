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

export const SigninFormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export const EditProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.union([
    z.string(),
    z
      .instanceof(File)
      .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          ),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    z.undefined(),
  ]),
});
