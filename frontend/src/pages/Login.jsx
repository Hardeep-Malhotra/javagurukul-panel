import { useState } from "react";
import { Form, Button, message, Spin, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOtpTimer } from "../components/Login/useOtpTimer";
import { useLockTimer } from "../components/Login/useLockTimer";
import EmailPasswordForm from "../components/Login/EmailPasswordForm";
import OtpVerificationForm from "../components/Login/OtpVerificationForm";
import ForgotPasswordModal from "../components/Login/ForgotPasswordModal";

axios.defaults.withCredentials = true;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { timeLeft, setIsTimerActive, formatTime, resetTimer } =
    useOtpTimer(300);

  const { lockTimeLeft, isLocked, formatLockTime, startLock } = useLockTimer();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleResendOtp = async () => {
    if (isLocked) return;
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
      if (error.response && error.response.status === 429) {
        message.error(error.response.data.message);
        startLock(3600);
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
      if (error.response && error.response.status === 429) {
        message.error("Security Alert: Too many attempts!");
        startLock(3600);
      } else {
        message.error(error.response?.data?.message || "Invalid Credentials!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ============ LEFT BRANDING PANEL ============ */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #14212a 0%, #14212a 55%, #17647e 100%)",
        }}
      >
        {/* Subtle decorative glow circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Logo card - solid white for max contrast/visibility */}
          <div className="bg-white rounded-2xl px-6 py-5 shadow-2xl mb-8">
            <img
              src="https://javagurukul.com/images/java-gurukul-logo.png"
              alt="JavaGurukul Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">
            Admin Control Panel
          </span>

          <h1 className="text-3xl font-black text-white mb-3 leading-tight">
            Manage Courses,
            <br />
            Onboard Students
          </h1>
          <p className="text-gray-300 text-sm mb-10 leading-relaxed">
            A dedicated workspace for JavaGurukul instructors to onboard
            students, manage courses, and run live classes — all in one place.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 w-full border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-black text-brand-orange">500+</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-1">
                Students
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-orange">50+</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-1">
                Courses
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-orange">100+</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-1">
                Lectures
              </p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-gray-500 text-xs tracking-widest uppercase mt-12">
          Admin Portal • Secure Access
        </p>
      </div>

      {/* ============ RIGHT FORM PANEL ============ */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-brand-paper p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="flex justify-center mb-6">
            <img
              src="https://javagurukul.com/images/java-gurukul-logo.png"
              alt="JavaGurukul Logo"
              className="h-30 w-auto object-contain"
            />
          </div>

          <h2 className="text-2xl font-black text-brand-ink mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Sign in to access the admin panel
          </p>

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
            <Form
              form={form}
              name="admin_login"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              disabled={isLocked}
            >
              <EmailPasswordForm isOtpSent={isOtpSent || isLocked} />

              {!isOtpSent && !isLocked && (
                <div className="flex justify-end -mt-2 mb-4">
                  <span
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-semibold text-[#2f8dae] hover:text-orange-500 cursor-pointer transition-colors"
                  >
                    Forgot Password?
                  </span>
                </div>
              )}

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
                    backgroundColor:
                      isLocked || (timeLeft === 0 && isOtpSent)
                        ? "#9ca3af"
                        : "#2f8dae",
                  }}
                  disabled={isLocked || (timeLeft === 0 && isOtpSent)}
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

          <p className="text-center text-xs text-gray-400 mt-4">
            Protected by institutional security protocols
          </p>
        </div>
      </div>

      <ForgotPasswordModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Login;
