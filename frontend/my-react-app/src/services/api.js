import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url/api",
});

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const register = (email, password) =>
  API.post("/auth/register", { email, password });

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const sendMessageToBot = (message) =>
  API.post("/chatbot", { message });
