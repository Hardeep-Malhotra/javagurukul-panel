// 📄 frontend/src/services/studentService.js
import axios from "axios";
import { API_BASE_URL } from "../config/api";

// Backend Base URL
const API_URL = `${API_BASE_URL}/api/students`;

// ==========================================
// 🛡️ ADMIN PANEL OPERATION METHODS
// ==========================================

// 1. Add Student
export const addStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/add`, studentData);
  return response.data;
};

// 2. Get Students by Category Tab
export const getStudentsByTab = async (category) => {
  const response = await axios.get(
    `${API_URL}/tab/${category.toUpperCase()}`
  );
  return response.data;
};

// 3. Enroll Student
export const enrollStudent = async (id, enrollmentData) => {
  const response = await axios.put(
    `${API_URL}/${id}/enroll`,
    enrollmentData
  );
  return response.data;
};

// 4. Unenroll Student
export const unenrollStudent = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/unenroll`);
  return response.data;
};

// 5. Update Student Status
export const updateStudentStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}/status`, {
    status,
  });
  return response.data;
};

// 6. Delete Student
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 7. Check Email Availability
export const checkEmailAvailability = async (email) => {
  const response = await axios.post(`${API_URL}/check-email`, {
    email,
  });
  return response.data;
};

// ==========================================
// 🔓 STUDENT LOGIN
// ==========================================

export const loginStudent = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

// ==========================================
// Student Videos
// ==========================================

export const getBatchVideos = async (batchName) => {
  const response = await axios.get(
    `${API_URL}/my-batch-videos/${encodeURIComponent(batchName)}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getVideoAccess = async (videoId) => {
  const response = await axios.get(
    `${API_URL}/video-access/${videoId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// Batch APIs
// ==========================================

export const createBatchAPI = async (batchData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/batches/add`,
    batchData
  );

  return response.data;
};

export const fetchAllBatchesAPI = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/batches/all`
  );

  return response.data;
};

export const updateBatchAPI = async (id, batchData) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/batches/edit/${id}`,
    batchData
  );

  return response.data;
};

export const deleteBatchAPI = async (id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/batches/delete/${id}`
  );

  return response.data;
};

// ==========================================
// AI Notes APIs
// ==========================================

export const fetchVideoNotesStatusAPI = async (youtubeVideoId) => {
  return await axios.get(
    `${API_BASE_URL}/api/notes/${youtubeVideoId}`
  );
};

export const fetchAllAvailableNotesAPI = async () => {
  return await axios.get(
    `${API_BASE_URL}/api/notes/all/lectures`
  );
};