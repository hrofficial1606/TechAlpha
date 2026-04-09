import api from "./api";

export async function initiateRegistration(data) {
  const response = await api.post("/auth/register/initiate", data);
  return response.data;
}

export async function verifyRegistrationOtp(data) {
  const response = await api.post("/auth/register/verify", data);
  return response.data;
}

export async function initiateLogin(data) {
  const response = await api.post("/auth/login/initiate", data);
  return response.data;
}

export async function initiateForgotPassword(data) {
  const response = await api.post("/auth/forgot-password/initiate", data);
  return response.data;
}

export async function verifyForgotPassword(data) {
  const response = await api.post("/auth/forgot-password/verify", data);
  return response.data;
}

export async function fetchUserProfile() {
  const response = await api.get("/secure/user/profile");
  return response.data;
}
