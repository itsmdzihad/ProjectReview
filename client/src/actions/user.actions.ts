"use server";

import { userServices } from "@/services/user.services";
import type { LoginPayload, RegistrationPayload } from "@/types";

export async function loginAction(payload: LoginPayload) {
  return userServices.login(payload);
}

export async function registrationAction(payload: RegistrationPayload) {
  return userServices.register(payload);
}
