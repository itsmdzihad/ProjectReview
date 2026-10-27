import type { LucideIcon } from "lucide-react";

export type Route = {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
};

export type DashboardRole = "student" | "mentor";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR";
};

export type LoginResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: AuthUser;
};

export type LoginResult =
  | { data: LoginResponse; error: null }
  | { data: null; error: { message: string } };

export type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegistrationResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: "STUDENT" | "MENTOR";
  };
};

export type RegistrationResult =
  | { data: RegistrationResponse; error: null }
  | { data: null; error: { message: string } };

export type SessionResult =
  | { data: AuthUser; error: null }
  | { data: null; error: { message: string } };
