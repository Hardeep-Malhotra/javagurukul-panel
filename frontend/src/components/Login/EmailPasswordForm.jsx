import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const EmailPasswordForm = ({ isOtpSent }) => {
  return (
    <>
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
          disabled={isOtpSent}
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
          disabled={isOtpSent}
        />
      </Form.Item>
    </>
  );
};

export default EmailPasswordForm;
