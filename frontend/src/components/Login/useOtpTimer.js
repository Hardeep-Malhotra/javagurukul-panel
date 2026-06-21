import { useState, useEffect } from "react";

export const useOtpTimer = (initialTime = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsTimerActive(false);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsTimerActive(true);
  };

  return { timeLeft, isTimerActive, setIsTimerActive, formatTime, resetTimer };
};
