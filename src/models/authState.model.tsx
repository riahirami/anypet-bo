import { User } from "../models/user.model";

export interface AuthState {
    name: string | null;
    token: string | null;
    message: string | null;
    user: User | null;
  }