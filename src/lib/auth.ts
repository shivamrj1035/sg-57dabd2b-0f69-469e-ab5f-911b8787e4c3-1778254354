import { User, UserRole } from "@/types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authLib = {
  setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  setUser(user: User) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  removeUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  clear() {
    this.removeToken();
    this.removeUser();
  },

  isRole(user: User | null, role: UserRole): boolean {
    return user?.role === role;
  },

  hasRole(user: User | null, roles: UserRole[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
  },
};