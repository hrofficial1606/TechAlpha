import api from "./api";

export async function getEvents() {
  const response = await api.get("/public/events");
  return response.data;
}

export async function getEvent(eventId) {
  const response = await api.get(`/public/events/${eventId}`);
  return response.data;
}

export async function getGalleryItems() {
  const response = await api.get("/public/gallery");
  return response.data;
}

export async function getHackathonContent() {
  const response = await api.get("/public/hackathon-content");
  return response.data;
}

export async function getAdminDashboard() {
  const response = await api.get("/secure/admin/dashboard");
  return response.data;
}

export async function createEvent(event) {
  const response = await api.post("/secure/admin/events", event);
  return response.data;
}

export async function deleteEvent(eventId) {
  const response = await api.delete(`/secure/admin/events/${eventId}`);
  return response.data;
}

export async function downloadEventRegistrationsPdf(eventId) {
  const response = await api.get(`/secure/admin/events/${eventId}/registrations/pdf`, {
    responseType: "blob",
  });
  return response.data;
}

export async function addGalleryItem(payload) {
  const response = await api.post("/secure/admin/gallery", payload);
  return response.data;
}

export async function deleteGalleryItem(galleryItemId) {
  const response = await api.delete(`/secure/admin/gallery/${galleryItemId}`);
  return response.data;
}

export async function uploadAdminMedia({ file, folder, resourceType = "image" }) {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) {
    formData.append("folder", folder);
  }
  formData.append("resourceType", resourceType);

  const response = await api.post("/secure/admin/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getAdminHackathonContent() {
  const response = await api.get("/secure/admin/hackathon-content");
  return response.data;
}

export async function saveAdminHackathonContent(payload) {
  const response = await api.post("/secure/admin/hackathon-content", payload);
  return response.data;
}

export async function getEventRegistrations(eventId) {
  const response = await api.get(`/secure/admin/events/${eventId}/registrations`);
  return response.data;
}

export async function markAttendance(registrationId) {
  const response = await api.post(`/secure/admin/registrations/${registrationId}/attend`);
  return response.data;
}
