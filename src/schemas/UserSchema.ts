import z from "zod";
import { parseSchema } from "./parseSchema";
import type { IUserBase } from "../interfaces/IUser";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const BaseUserSchema = z.object({
  name: z.string().min(3, "Nome muito curto").max(30, "Nome muito longo"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha muito curta"),
});

export type RegisterFormData = z.infer<typeof BaseUserSchema>;

const UserSchemaWithoutPassword = BaseUserSchema.omit({ password: true }).partial();

export function validateCreateUserSchema(data: IUserBase) {
  return parseSchema(BaseUserSchema, data);
}

export function validateUserWithoutPassword(data: Partial<IUserBase>) {
  return parseSchema(UserSchemaWithoutPassword, data);
}
