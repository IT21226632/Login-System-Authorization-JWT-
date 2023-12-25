import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500/api",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log("token attached to the header by axios instance");
    }

    console.log("token returned with header by axios instance", accessToken);
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
