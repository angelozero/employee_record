import axios from "axios";
import { toast } from "react-toastify";

export const HTTPClient = axios.create({
  baseURL: process.env.REACT_APP_HOST || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

HTTPClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

HTTPClient.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    toast.error("Falha na requisição");
    return Promise.reject(error);
  }
);