import * as z from "zod";
import { isExistInDatabase } from "../services/authentication.service";

const EmailSChema = z
  .string()
  .email("Email không hợp lệ")
  .refine(async (email) => {
    const result = await isExistInDatabase(email);
    return !result;
  }, "Email đã tồn tại");

const PasswordSchema = z
  .string()
  .min(4, "Password cần tối thiểu 4 ký tự")
  .max(12, "Password tối đa được 12 ký tự")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password cần tối thiểu 1 ký tự in thường",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password cần tối thiểu 1 ký tự in hoa",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password cần tối thiểu 1 ký tự số",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password cần tối thiểu 1 ký tự đặc biệt",
  });

const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name cần tối thiểu 1 ký tự"),
    email: EmailSChema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine(
    (item) => item.password === item.confirmPassword,
    "Confirm password không khớp"
  );

export { RegisterSchema };
