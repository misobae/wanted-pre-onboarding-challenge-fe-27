import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "이메일을 입력해 주세요." })
  .email({ message: "이메일 형식이 올바르지 않습니다." });
