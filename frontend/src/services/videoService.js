// 📄 frontend/src/services/videoService.js
import axios from "axios";

// Base URL tumhari backend port ke hisab se
const API_URL = "http://localhost:5000/api/video-access";

// 1. Video Library me fresh video add karne ke liye
export const addVideoToLibrary = async (videoData) => {
  try {
    const response = await axios.post(`${API_URL}/add-video`, videoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to add video to library");
  }
};

// 2. Library ki saari videos fetch karne ke liye (Dashboard cards/table ke liye)
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to fetch videos");
  }
};

// 3. Assignment Modal ke liye saare batches aur unke active counts lane ke liye
export const getLiveBatchCounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/batch-counts`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || new Error("Failed to load batch student counts")
    );
  }
};

// 4. Kisi specific video ko batch assign karne ke liye
export const assignVideoToBatch = async (payload) => {
  try {
    // 🌟 FIXED: Tumhare backend route ke mutabik (.post("/assign")) kiya h
    const response = await axios.post(`${API_URL}/assign`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to assign batch");
  }
};
