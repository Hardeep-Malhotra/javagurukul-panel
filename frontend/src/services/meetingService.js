import axios from "axios";

const API_URL = "http://localhost:5000/api/meeting";

// ==========================================
// Create Meeting
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
// Get All Meetings
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
// Get Meeting By Id
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
// Join Meeting
// ==========================================
export const joinMeetingAPI = async (meetingData) => {
  const response = await axios.post(
    `${API_URL}/join`,
    meetingData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// Start Meeting
// ==========================================
export const startMeetingAPI = async (meetingId) => {
  const response = await axios.put(
    `${API_URL}/start/${meetingId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ==========================================
// End Meeting
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

// ==========================================
// Verify Meeting
// ==========================================

export const verifyMeetingAPI = async (meetingCode) => {
  const response = await axios.post(
    `${API_URL}/verify`,
    {
      meetingCode,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};