import axios from "axios";
import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-hot-toast";



export const useAuthStore = create((set) => ({
  onLoading: false,
  user: null,
  isVerified: false,

  registerUser: async (data) => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.post("/register", data, {
        withCredentials: true,
      });
    
      set({ user: response.data.user });
      toast.success("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },
  login: async (data) => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.post("/login", data, {
        withCredentials: true,
      });
      set({ user: response.data.user });
      toast.success("User logged in successfully!");
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Error logging in user!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },
  verifyUser: async (token) => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.get(`/verify/${token}`, {
        withCredentials: true,
      });
      set({ isVerified: true });
      toast.success("User verified successfully!");
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Error verifying user!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.get(
        "/logout",  {},  
        { withCredentials: true }
      );
      set({ user: null });
      toast.success("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out user:", error);
      toast.error("User logged out was unsuccessful!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },
  forgotPassword: async (data) => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.post("/forgotPassword", data, {
        withCredentials: true,
      });

      toast.success("Password reset link sent successfully!");
    } catch (error) {
      console.error("Error sending password reset link:", error);
      toast.error("Error sending password reset link!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },
  resetPassword: async (data) => {
    try {
      set({ onLoading: true });
      const response = await axiosInstance.post(`/resetPassword/${data.token}`, data, {
        withCredentials: true,
      });
      toast.success("Password reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password!");
      throw error;
    } finally {
      set({ onLoading: false });
    }
  },
}));
export default useAuthStore;
