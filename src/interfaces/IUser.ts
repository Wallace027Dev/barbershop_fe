import { UserRole } from "../types/UserRole";

export interface IUserBase {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  token: string;
}

export interface IUser extends IUserBase {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}