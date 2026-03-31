import api from "./api";

export async function getUserDashboard() {
  const response = await api.get("/secure/user/dashboard");
  return response.data;
}

export async function getMyRegistrations() {
  const response = await api.get("/secure/user/registrations");
  return response.data;
}

export async function createPayPalOrder(eventId) {
  const response = await api.post(`/secure/user/registrations/${eventId}/paypal-order`);
  return response.data;
}

export async function capturePayPalOrder(orderId) {
  const response = await api.post("/secure/user/registrations/paypal/capture", { orderId });
  return response.data;
}

export function getQrImageUrl(registrationId) {
  return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"}/secure/user/registrations/${registrationId}/qr-image`;
}
