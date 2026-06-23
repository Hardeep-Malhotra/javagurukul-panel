import axios from "axios";

// Backend base URL
const API_URL = "http://localhost:5000/api/students";

// 1. Add Student
export const addStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/add`, studentData);
  return response.data;
};

// 2. Get Students by Category Tab (REGISTERED, ENROLLED, UNENROLLED)
export const getStudentsByTab = async (category) => {
  const response = await axios.get(`${API_URL}/tab/${category.toLowerCase()}`);
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
