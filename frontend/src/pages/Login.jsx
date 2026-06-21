import { useState, useEffect } from "react"; // React hooks for managing state and side-effects
import { Form, Input, Button, message, Spin } from "antd"; // Ant Design UI components
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons"; // Icons for input fields
import axios from "axios"; // Axios library to make API requests to backend
import { useNavigate } from "react-router-dom"; // Hook to redirect users to different pages

// This tells Axios to automatically pass cookies (like sessions/tokens) with every request
axios.defaults.withCredentials = true;

const Login = () => {
  // ----------------------------------------------------
  // STATES: Temporary storage for data inside component
  // ----------------------------------------------------
  const [loading, setLoading] = useState(false); // Controls the loading spinner overlay
  const [isOtpSent, setIsOtpSent] = useState(false); // Flags whether to show the password screen or OTP screen
  const [userEmail, setUserEmail] = useState(""); // Saves user email securely after step 1 for use in step 2

  // TIMER STATES: 5 minutes = 300 seconds
  const [timeLeft, setTimeLeft] = useState(300); // Keeps track of remaining seconds for OTP expiration
  const [isTimerActive, setIsTimerActive] = useState(false); // Turns the countdown timer ON or OFF

  const navigate = useNavigate(); // Hook tool to change routes programmatically
  const [form] = Form.useForm(); // Ant Design form instance to read or reset input values manually

  // ----------------------------------------------------
  // EFFECT LOGIC: Runs automatically when 'isTimerActive' changes
  // ----------------------------------------------------
  useEffect(() => {
    let interval = null;

    // Start countdown only if timer is flagged active and time is above 0
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          // If time drops to 1, next step is 0, so stop timer immediately
          if (prevTime <= 1) {
            setIsTimerActive(false); // Stop the clock flag
            clearInterval(interval); // Destroy the background interval loop
            return 0; // Set timer state to exactly 0
          }
          return prevTime - 1; // Decrease timer by 1 second every tick
        });
      }, 1000); // Triggers every 1000 milliseconds (1 second)
    }

    // CLEANUP: Clears the background timer if user leaves page or timer resets
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]); // Monitored dependency - only triggers when timer starts or stops

  // ----------------------------------------------------
  // HELPER FUNCTION: Converts pure seconds into "MM:SS" visual text
  // ----------------------------------------------------
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get whole minutes
    const remainingSeconds = seconds % 60; // Get leftover seconds
    // padStart makes sure it always shows 2 digits (e.g., "05:09" instead of "5:9")
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ----------------------------------------------------
  // RESEND OTP: Triggers when user clicks the "Resend" link
  // ----------------------------------------------------
  const handleResendOtp = async () => {
    setLoading(true); // Turn on loading screen spinner
    try {
      // Extract the current password typed in the input box using AntD form API
      const currentValues = form.getFieldsValue();

      // Hit the login endpoint again to re-trigger OTP generation on backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email: userEmail,
          password: currentValues.password,
        },
      );

      if (response.data.success) {
        message.success("A fresh security OTP has been sent to your email!");
        setTimeLeft(300); // Reset timer state back to full 5 minutes
        setIsTimerActive(true); // Fire up the countdown loop again
      }
    } catch (error) {
      // Catch any server error and extract message, default to fallback text
      const errorMsg =
        error.response?.data?.message || "Failed to resend OTP. Try again!";
      message.error(errorMsg);
    } finally {
      setLoading(false); // Turn off loading screen spinner
    }
  };

  // ----------------------------------------------------
  // FORM SUBMISSION handler: Handles BOTH Login and OTP verification steps
  // ----------------------------------------------------
  const onFinish = async (values) => {
    setLoading(true); // Lock UI with loading state
    try {
      // STEP 1: If OTP has not been sent yet, verify email and password first
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
          setUserEmail(values.email); // Store email for the next API call step
          setIsOtpSent(true); // Shift UI view to OTP field input screen
          setTimeLeft(300); // Initialize timer state to 300 seconds
          setIsTimerActive(true); // Activate countdown effect loop
        }
      }
      // STEP 2: If OTP screen is already visible, handle the OTP verification token
      else {
        // Block action if user tries to submit code after timer hits 00:00
        if (timeLeft === 0) {
          message.error("Your OTP has expired! Please click Resend OTP.");
          setLoading(false);
          return; // Kill function execution right here
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
          // Store user details into local browser memory for auth route checks
          localStorage.setItem("adminUser", JSON.stringify(response.data.user));
          navigate("/dashboard"); // Take the authenticated admin into protected dashboard route
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid Credentials!";
      message.error(errorMsg);
    } finally {
      setLoading(false); // Unlock UI by hiding spinner element
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-paper p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100 transform transition-all">
        {/* TOP SECTION: Header Logo placement */}
        <div className="flex justify-center items-center mb-2">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-50 w-auto object-contain border-b-4 border-brand-orange pb-2"
          />
        </div>

        {/* LOADING WRAPPER: Darkens screen and loops spinner when loading state is true */}
        <Spin
          spinning={loading}
          tip={isOtpSent ? "Verifying OTP secure..." : "Sending OTP..."}
        >
          {/* ANT DESIGN FORM CONTAINER */}
          <Form
            form={form}
            name="admin_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false} // Hides the red asterisks (*) from labels
          >
            {/* INPUT FIELD: Email Address */}
            <Form.Item
              name="email"
              label={
                <span className="text-brand-ink font-bold text-sm">
                  Email Address
                </span>
              }
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-brand-muted" />}
                placeholder="admin@javagurukul.com"
                className="h-11 rounded-lg border-gray-300 focus:border-brand-blue"
                disabled={isOtpSent} // Freeze input box once step 1 succeeds
              />
            </Form.Item>

            {/* INPUT FIELD: Password Input */}
            <Form.Item
              name="password"
              label={
                <span className="text-brand-ink font-bold text-sm">
                  Password
                </span>
              }
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-brand-muted" />}
                placeholder="••••••••"
                className="h-11 rounded-lg border-gray-300 focus:border-brand-blue"
                disabled={isOtpSent} // Freeze password box once step 1 succeeds
              />
            </Form.Item>

            {/* CONDITIONAL RENDERING: Shows OTP field only if isOtpSent flag is true */}
            {isOtpSent && (
              <>
                <Form.Item
                  name="otp"
                  label={
                    <div className="flex justify-between items-center w-full">
                      <span className="text-brand-ink font-bold text-sm text-blue-600">
                        Enter 6-Digit Secure OTP
                      </span>
                      {/* DYNAMIC TIMER BADGE: Flips color layout automatically based on time count */}
                      {timeLeft > 0 ? (
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          Expires in: {formatTime(timeLeft)}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          OTP Expired!
                        </span>
                      )}
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter the OTP received on your email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<SafetyOutlined className="text-blue-500" />}
                    placeholder="X X X X X X"
                    maxLength={6} // Stops user from entering more than 6 digits
                    className="h-11 rounded-lg border-blue-300 focus:border-blue-500 text-center font-bold tracking-widest"
                  />
                </Form.Item>

                {/* INTERACTIVE LINK: Click to resend token */}
                <div className="text-right mb-4 -mt-2">
                  <Button
                    type="link"
                    size="small"
                    onClick={handleResendOtp}
                    disabled={timeLeft > 0} // Blocks click actions until time hits zero
                    className="p-0 font-semibold text-xs text-blue-600 disabled:text-gray-400"
                  >
                    Didn't receive code? Resend OTP
                  </Button>
                </div>
              </>
            )}

            {/* ACTION BUTTON: Submit handler */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit" // Instructs form to trigger onFinish execution when clicked
                block // Stretches button width to take up full form grid width
                className="h-11 rounded-lg font-bold text-base shadow-md transition-all border-none"
                style={{
                  // Dynamic styles: turns button gray if code expires to block user mistakes visually
                  backgroundColor:
                    timeLeft === 0 && isOtpSent ? "#9ca3af" : "#2f8dae",
                }}
                disabled={timeLeft === 0 && isOtpSent} // System lock if token life expires
              >
                {/* Dynamic text changes based on step progression */}
                {isOtpSent ? "Verify OTP & Login" : "Sign In to Panel"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>

        {/* FOOTER DISCLAIMER */}
        <div className="text-center mt-4">
          <span className="text-xs text-brand-muted">
            Protected under secure RBAC framework.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
