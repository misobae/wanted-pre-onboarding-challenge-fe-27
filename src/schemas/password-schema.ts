import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "비밀번호는 8자 이상이어야 합니다." });
