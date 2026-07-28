import axios from "axios";

const API_URL = "http://localhost:5000/api/meeting";

// ==========================================
// Create Live Class
// ==========================================
export const createMeetingAPI = async (meetingData) => {
  const response = await axios.post(
    `${API_URL}/create`,
    meetingData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// Get All Live Classes
// ==========================================
export const getAllMeetingsAPI = async () => {
  const response = await axios.get(
    `${API_URL}/all`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// Get Live Class By ID
// ==========================================
export const getMeetingByIdAPI = async (meetingId) => {
  const response = await axios.get(
    `${API_URL}/${meetingId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// End Live Class
// ==========================================
export const endMeetingAPI = async (meetingId) => {
  const response = await axios.put(
    `${API_URL}/end/${meetingId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};