// 📄 frontend/src/services/studentService.js
import axios from "axios";

// Backend base URL (Ensure this matches your server port entry precisely)
const API_URL = "http://localhost:5000/api/students";

// ==========================================
// 🛡️ ADMIN PANEL OPERATION METHODS
// ==========================================

// 1. Add Student
export const addStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/add`, studentData);
  return response.data;
};

// 2. Get Students by Category Tab (REGISTERED, ENROLLED, UNENROLLED)
export const getStudentsByTab = async (category) => {
  const response = await axios.get(`${API_URL}/tab/${category.toUpperCase()}`); // URL case matches standard enum tags
  return response.data;
};

// 3. Enroll Student (PUT Request)
export const enrollStudent = async (id, enrollmentData) => {
  const response = await axios.put(`${API_URL}/${id}/enroll`, enrollmentData);
  return response.data;
};

// 4. Unenroll Student (PUT Request)
export const unenrollStudent = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/unenroll`);
  return response.data;
};

// 5. Update Student Status (Active/Inactive toggle)
export const updateStudentStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/${id}/status`, { status });
  return response.data;
};

// 6. Delete Student (permanent delete)
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 7. Check Email Availability (Live Unique Check)
export const checkEmailAvailability = async (email) => {
  const response = await axios.post(`${API_URL}/check-email`, { email });
  return response.data;
};

// ==========================================
// 🔓 NEW: STUDENT PORTAL OPERATION METHODS
// ==========================================

// 8. Student Portal Auth Login Gateway
export const loginStudent = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// 9. Fetch Assigned Batch Video Lectures Mapped Pipeline

export const getBatchVideos = async (batchName) => {
  const response = await axios.get(
    `${API_URL}/my-batch-videos/${encodeURIComponent(batchName)}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getVideoAccess = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/video-access/${videoId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
