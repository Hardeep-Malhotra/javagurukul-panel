// 📄 frontend/src/context/StudentAuthContext.jsx

import { createContext, useContext, useState } from "react";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const storedStudent = localStorage.getItem("studentData");
    return storedStudent ? JSON.parse(storedStudent) : null;
  });

  const login = (studentData) => {
    setStudent(studentData);
    localStorage.setItem("studentData", JSON.stringify(studentData));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem("studentData");

    // Cookie backend se clear hogi
    window.location.href = "/student/login";
  };

  return (
    <StudentAuthContext.Provider
      value={{
        student,
        login,
        logout,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => {
  return useContext(StudentAuthContext);
};
