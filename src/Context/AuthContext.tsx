import type { User } from "firebase/auth";
import { createContext } from "react";

export const AuthContext = createContext<{ user: User | null, theme: string ,userLoading : boolean} | null>(null)