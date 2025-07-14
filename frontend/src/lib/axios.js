
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1/users", // Update based on backend port
  withCredentials: true, // If your backend uses cookies for auth
});

export default axiosInstance;

// export const registerUser = (data) =>
// { const response = axiosInstance.post("/register", data, { withCredentials: true });
//  toast.success("User registered successfully!");
//   return response;
// }
