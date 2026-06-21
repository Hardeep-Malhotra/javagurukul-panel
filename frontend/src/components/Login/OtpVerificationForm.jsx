import { Form, Input, Button } from "antd";
import { SafetyOutlined } from "@ant-design/icons";

const OtpVerificationForm = ({ timeLeft, formatTime, handleResendOtp }) => {
  return (
    <>
      <Form.Item
        name="otp"
        label={
          <div className="flex justify-between items-center w-full">
            <span className="text-brand-ink font-bold text-sm text-blue-600">
              Enter 6-Digit Secure OTP
            </span>
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
          maxLength={6}
          className="h-11 rounded-lg border-blue-300 focus:border-blue-500 text-center font-bold tracking-widest"
        />
      </Form.Item>

      <div className="text-right mb-4 -mt-2">
        <Button
          type="link"
          size="small"
          onClick={handleResendOtp}
          disabled={timeLeft > 0}
          className="p-0 font-semibold text-xs text-blue-600 disabled:text-gray-400"
        >
          Didn't receive code? Resend OTP
        </Button>
      </div>
    </>
  );
};

export default OtpVerificationForm;
