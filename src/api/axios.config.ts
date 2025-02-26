import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  timeout: 10000,
});

// Adicionar interceptor para logs
api.interceptors.request.use(
  (config) => {
    console.log("Request Data:", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Modificando o interceptor de token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro da API:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("Erro na requisição:", error.message);
    } else {
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
