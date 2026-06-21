// 📄 src/components/Login/useLockTimer.js
import { useState, useEffect } from "react";

/**
 * Custom Hook: useLockTimer
 * Purpose: Manages the 1-hour strict countdown lock when the backend blocks an IP.
 */
export const useLockTimer = () => {
  // 1. Setup states to track remaining seconds and the lock status (ON/OFF)
  const [lockTimeLeft, setLockTimeLeft] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let interval = null;

    // 2. Start the clock engine only if the system is locked and time is more than 0
    if (isLocked && lockTimeLeft > 0) {
      interval = setInterval(() => {
        setLockTimeLeft((prev) => {
          // 3. Auto-Stop: If only 1 second is left, unlock the application immediately
          if (prev <= 1) {
            setIsLocked(false); // Remove the screen lock flag
            clearInterval(interval); // Kill the background ticking engine
            return 0; // Reset the timer state to exactly 0
          }
          // 4. Tick-Tick: Decrease the remaining time by 1 second on every tick
          return prev - 1;
        });
      }, 1000); // 1000ms = Runs exactly every 1 second
    }

    // 5. Cleanup: If the user leaves the page, destroy the timer to prevent browser slowdowns
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockTimeLeft]); // Watch these variables - restart loop if their values change

  /**
   * Helper Function: Converts total pure seconds into "HH:MM:SS" or "MM:SS" visual format
   */
  const formatLockTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Calculate whole hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes
    const remainingSeconds = seconds % 60; // Calculate leftover seconds

    // Small tool to always show 2 digits (e.g., converts "9" seconds to "09")
    const pad = (num) => num.toString().padStart(2, "0");

    // If lock duration has hours left, show HH:MM:SS format
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    }
    // Otherwise, show standard MM:SS format
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  /**
   * Action Function: Call this function to trigger the application lock
   * Default duration is 3600 seconds (which is exactly 1 Hour)
   */
  const startLock = (durationInSeconds = 3600) => {
    setLockTimeLeft(durationInSeconds);
    setIsLocked(true);
  };

  // Return all functions and states so they can be easily used inside Login.jsx
  return { lockTimeLeft, isLocked, formatLockTime, startLock };
};
