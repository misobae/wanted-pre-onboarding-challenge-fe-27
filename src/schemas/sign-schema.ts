import { z } from "zod";
import { emailSchema } from "./email-schema";
import { passwordSchema } from "./password-schema";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
