import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export async function createPeaceBond(peaceBondDetails) {
  const response = await api.post("/peacebonds", peaceBondDetails);
  return response.data;
}

export async function getPeaceBond(id, staffUserId) {
  const response = await api.get(`/peacebonds/${id}`, {
    params: { createdBy: staffUserId },
  });
  return response.data;
}

export async function getPeaceBonds(staffUserId) {
  const response = await api.get("/peacebonds", {
    params: { createdBy: staffUserId },
  });
  return response.data;
}

export async function loginStaffUser(email, password) {
  const response = await api.post("/auth/login", { email, password });
  return response.data.staff;
}

export async function updatePeaceBondProgress(id, completedActions, staffUserId) {
  const response = await api.patch(`/peacebonds/${id}/progress`, {
    completedActions,
    createdBy: staffUserId,
  });
  return response.data;
}

export async function submitCompletionReport(id, reportDetails, staffUserId) {
  const response = await api.patch(`/peacebonds/${id}/completion-report`, {
    ...reportDetails,
    createdBy: staffUserId,
  });
  return response.data;
}
