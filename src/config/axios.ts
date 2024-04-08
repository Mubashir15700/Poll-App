import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

// Add a response interceptor
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.status === 401 || error.response.status === 403) {
                // Show toast notification before redirection
                toast.error("You are not authorized to access this resource. Redirecting to login page...");

                // Redirect the user to the homepage after a short delay
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000); // Redirect after 3 seconds
            }
        } else if (error.request) {
            // The request was made but no response was received
            toast.error("An error occurred while processing your request. Please try again later.");
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            toast.error("An error occurred while processing your request. Please try again later.");
            console.error("Error", error.message);
        }

        return Promise.reject(error);
    }
);

export default axios;
