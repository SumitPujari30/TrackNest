import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//request Intercepter
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response Intercepter

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                const isOnLoginPage = window.location.pathname === "/login";
                if(!isOnLoginPage) {
                window.location.href = "/login"; // redirect to login page
                }
            
            }
            else if (error.response.status === 500) {
                console.error("Server Error. Please try again later.")
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timed out. Please try again later.")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


