import { cookies } from "next/headers";
import { env } from "@/types/env";
import type {
  LoginPayload,
  LoginResponse,
  LoginResult,
  AuthUser,
  RegistrationPayload,
  RegistrationResponse,
  RegistrationResult,
  SessionResult,
} from "@/types";

const API_URL = env.BACKEND_URL;

const login = async (payload: LoginPayload): Promise<LoginResult> => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      data?: LoginResponse["data"];
    } | null;

    if (!res.ok || !data?.success || !data.data) {
      return {
        data: null,
        error: {
          message: data?.message ?? "Unable to sign in. Please try again.",
        },
      };
    }

    const setCookie = res.headers.get("set-cookie");
    const accessToken = setCookie
      ?.split(";")[0]
      .match(/^accessToken=(.*)$/)?.[1];

    if (!accessToken) {
      return {
        data: null,
        error: { message: "The login response did not include a session." },
      };
    }

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return { data: data as LoginResponse, error: null };
  } catch {
    return {
      data: null,
      error: { message: "Something went wrong. Please try again." },
    };
  }
};

const register = async (
  payload: RegistrationPayload,
): Promise<RegistrationResult> => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      data?: RegistrationResponse["data"];
    } | null;

    if (!res.ok || !data?.success || !data.data) {
      return {
        data: null,
        error: {
          message:
            data?.message ?? "Unable to create your account. Please try again.",
        },
      };
    }

    return { data: data as RegistrationResponse, error: null };
  } catch {
    return {
      data: null,
      error: { message: "Something went wrong. Please try again." },
    };
  }
};

const getSession = async (cookieHeader: string): Promise<SessionResult> => {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const result = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      data?: AuthUser;
    } | null;

    if (!res.ok || !result?.success || !result.data) {
      return {
        data: null,
        error: { message: result?.message ?? "Session is missing." },
      };
    }

    return { data: result.data, error: null };
  } catch {
    return {
      data: null,
      error: { message: "Unable to verify the current session." },
    };
  }
};

const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return { data: true as const, error: null };
  } catch {
    return {
      data: null,
      error: { message: "Unable to log out. Please try again." },
    };
  }
};

export const userServices = {
  login,
  register,
  getSession,
  logout,
};
