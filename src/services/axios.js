import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Content-Type": "application/json"
    }
});

//   Adds the token to every request automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            // Add the token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//   Handles errors 
api.interceptors.response.use(
    (response) => {
   
        return response;
    },
    (error) => {
        
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.data.message}`);
        } else {
            console.error("Network Error: Please check your connection.");
        }
        
        return Promise.reject(error);
    }
);

export default api;