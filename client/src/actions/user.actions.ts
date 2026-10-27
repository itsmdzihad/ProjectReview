"use server";

import { userServices } from "@/services/user.services";
import type { LoginPayload, RegistrationPayload } from "@/types";
import { redirect } from "next/navigation";

export async function loginAction(payload: LoginPayload) {
  return userServices.login(payload);
}

export async function registrationAction(payload: RegistrationPayload) {
  return userServices.register(payload);
}

export async function logoutAction() {
  const result = await userServices.logout();

  if (result.error) {
    return result;
  }

  redirect("/");
}

export async function getStudentDashboardAnalyticsAction() {
  return userServices.getStudentDashboardAnalytics();
}

export async function getMentorDashboardAnalyticsAction() {
  return userServices.getMentorDashboardAnalytics();
}
