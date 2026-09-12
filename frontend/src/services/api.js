import axios from "axios";

const api = axios.create({
baseURL: "https://apartment-tenant-management-system-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;