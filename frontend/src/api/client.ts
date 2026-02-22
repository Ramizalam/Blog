import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api/v1";

export const client = axios.create({
    baseURL: BACKEND_URL,
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
