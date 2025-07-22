import z, { email } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    username: z.string().min(6),
    password: z.string().min(6),
    name: z.string().min(1),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(6),
    password: z.string().min(6),
  }),
});
