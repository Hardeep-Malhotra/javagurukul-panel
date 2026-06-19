import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Global configuration : give order to the browser for carry cookies in every request
axios.defaults.withCredentials = true;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email: values.email,
          password: values.password,
        },
      );

      if (response.data.success) {
        message.success("Login Successful! ");
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid Credentials!";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-paper p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-orange-100 transform transition-all">
        {/* Logo Image Wrapper */}
        <div className="flex justify-center items-center mb-2">
          <img
            src="https://javagurukul.com/images/java-gurukul-logo.png"
            alt="JavaGurukul Logo"
            className="h-50 w-auto object-contain border-b-4 border-brand-orange pb-2 "
          />
        </div>

        <Form
          name="admin_login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
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
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span className="text-brand-ink font-bold text-sm">Password</span>
            }
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-brand-muted" />}
              placeholder="••••••••"
              className="h-11 rounded-lg border-gray-300 focus:border-brand-blue"
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="h-11 rounded-lg bg-brand-blue hover:bg-brand-blue-dark font-bold text-base shadow-md transition-all border-none"
              style={{ backgroundColor: "#2f8dae" }}
            >
              Sign In to Panel
            </Button>
          </Form.Item>
        </Form>

        {/* Footer text */}
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
