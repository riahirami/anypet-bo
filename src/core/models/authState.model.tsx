import { User } from "./user.model";

export interface AuthState {
    name: string | null;
    token: string | null;
    message: string | null;
    user: User | null;
  }