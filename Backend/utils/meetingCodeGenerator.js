/**
 * Generate Random Unique Meeting Code
 * Example Output:
 * ABC-123
 * X7P-9Q2
 */

const generateMeetingCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return `${code.substring(0, 3)}-${code.substring(3, 6)}`;
};

module.exports = generateMeetingCode;