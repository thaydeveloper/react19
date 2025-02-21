import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
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
