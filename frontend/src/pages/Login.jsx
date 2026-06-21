// 📄 src/pages/Login.jsx
import { useState } from "react";
import { Form, Button, message, Spin, Alert } from "antd"; // Alert component add kiya
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOtpTimer } from "../components/Login/useOtpTimer";
import { useLockTimer } from "../components/Login/useLockTimer"; // 👈 Naya hook import kiya
import EmailPasswordForm from "../components/Login/EmailPasswordForm";
import OtpVerificationForm from "../components/Login/OtpVerificationForm";

axios.defaults.withCredentials = true;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { timeLeft, setIsTimerActive, formatTime, resetTimer } =
    useOtpTimer(300);

  // 🔑 Lock timer hook init kiya
  const { lockTimeLeft, isLocked, formatLockTime, startLock } = useLockTimer();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleResendOtp = async () => {
    if (isLocked) return; // Block action if app is locked
    setLoading(true);
    try {
      const currentValues = form.getFieldsValue();
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email: userEmail,
          password: currentValues.password,
        },
      );

      if (response.data.success) {
        message.success("A fresh security OTP has been sent to your email!");
        resetTimer();
      }
    } catch (error) {
      // 🚨 Handle rate limiting during resend
      if (error.response && error.response.status === 429) {
        message.error(error.response.data.message);
        startLock(3600); // 1 ghante ke liye frontend freeze
      } else {
        message.error(
          error.response?.data?.message || "Failed to resend OTP. Try again!",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (!isOtpSent) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/admin-login",
          {
            email: values.email,
            password: values.password,
          },
        );

        if (response.data.success) {
          message.success(response.data.message);
          setUserEmail(values.email);
          setIsOtpSent(true);
          setIsTimerActive(true);
        }
      } else {
        if (timeLeft === 0) {
          message.error("Your OTP has expired! Please click Resend OTP.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-otp",
          {
            email: userEmail,
            otp: values.otp,
          },
        );

        if (response.data.success) {
          message.success(response.data.message);
          localStorage.setItem("adminUser", JSON.stringify(response.data.user));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      // 🚨 YAHAN HOGA ASLI GAME: Catching Rate Limit
      if (error.response && error.response.status === 429) {
        message.error("Security Alert: Too many attempts!");
        startLock(3600); // 🔥 Frontend ko 1 ghante (3600s) ke liye lock kardo
      } else {
        message.error(error.response?.data?.message || "Invalid Credentials!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-paper p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="flex justify-center items-center mb-2">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-50 w-auto object-contain border-b-4 border-brand-orange pb-2"
          />
        </div>

        {/* ⏳ DYNAMIC SECURITY WARNING BANNER */}
        {isLocked && (
          <div className="mb-4">
            <Alert
              message="Access Temporarily Locked"
              description={`Due to security reasons, this panel is frozen. Please try again after: ${formatLockTime(lockTimeLeft)}`}
              type="error"
              showIcon
              closable={false}
            />
          </div>
        )}

        <Spin
          spinning={loading}
          tip={isOtpSent ? "Verifying OTP secure..." : "Sending OTP..."}
        >
          {/* 🔥 fieldsets or disabled form attribute dynamically blocks typing */}
          <Form
            form={form}
            name="admin_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            disabled={isLocked} // 👈 POORA FORM AUTOMATICALLY TYPELESS HO JAYEGA!
          >
            {/* Step 1 Fields */}
            <EmailPasswordForm isOtpSent={isOtpSent || isLocked} />

            {/* Step 2 Fields */}
            {isOtpSent && !isLocked && (
              <OtpVerificationForm
                timeLeft={timeLeft}
                formatTime={formatTime}
                handleResendOtp={handleResendOtp}
              />
            )}

            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-11 rounded-lg font-bold text-base shadow-md border-none"
                style={{
                  // Color gray out when system is locked
                  backgroundColor:
                    isLocked || (timeLeft === 0 && isOtpSent)
                      ? "#9ca3af"
                      : "#2f8dae",
                }}
                disabled={isLocked || (timeLeft === 0 && isOtpSent)} // Button disabled block
              >
                {isLocked
                  ? "System Locked"
                  : isOtpSent
                    ? "Verify OTP & Login"
                    : "Sign In to Panel"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
