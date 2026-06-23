// 📄 src/components/Students/EnrollStudentModal.jsx
import { useEffect, useState } from "react";
import { Modal, Form, Select, Button, message } from "antd";
import { enrollStudent } from "../../services/studentService";

const { Option } = Select;

// Tum yahan apni real course/subject list daal sakte ho,
// ya future me ek API se fetch kar sakte ho.
const COURSE_OPTIONS = [
  "MERN Stack Dev",
  "Java Full Stack",
  "Python Full Stack",
  "Data Analytics",
];

const SUBJECT_OPTIONS = [
  "HTML/CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Java",
  "Spring Boot",
  "Python",
  "SQL",
];

const EnrollStudentModal = ({ visible, student, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Modal har baar khulta hai to form reset karo, fir agar student ke
  // paas purana enrollment data hai (re-enroll case — pehle Enrolled tha,
  // Unenroll hua, ab wapas enroll ho raha hai), to wo prefill kar do.
  useEffect(() => {
    if (visible) {
      form.resetFields();
      const prevCourse = student?.enrollmentDetails?.courseName;
      const prevSubjects = student?.enrollmentDetails?.subjects;
      if (prevCourse || (prevSubjects && prevSubjects.length > 0)) {
        form.setFieldsValue({
          courseName: prevCourse || undefined,
          subject: prevSubjects || [],
        });
      }
    }
  }, [visible, student, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const res = await enrollStudent(student._id, {
        courseName: values.courseName,
        subjects: values.subject, // backend validator expects "subjects" (plural)
      });

      if (res.success) {
        message.success("Student enrolled successfully! 🎓");
        onSuccess(); // parent isse Registered + Enrolled dono tabs refresh karega
        onClose();
      } else {
        message.error(res.message || "Enroll nahi ho paaya");
      }
    } catch (err) {
      // validateFields fail hua to yahan bhi aa jaata hai, silently ignore
      if (err?.errorFields) return;
      console.log(err);
      message.error("Server error — enroll nahi ho paaya");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={`${student?.enrollmentDetails?.courseName ? "Re-enroll" : "Enroll"} Student — ${student?.name || ""}`}
      open={visible}
      onCancel={onClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          style={{ backgroundColor: "#fb991d", border: "none" }}
          onClick={handleSubmit}
        >
          Enroll Student
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          label="Course"
          name="courseName"
          rules={[
            { required: true, message: "Course select karna zaroori hai" },
          ]}
        >
          <Select placeholder="Select a course">
            {COURSE_OPTIONS.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Subjects"
          name="subject"
          rules={[
            { required: true, message: "Kam se kam ek subject select karo" },
          ]}
        >
          <Select mode="multiple" placeholder="Select subjects">
            {SUBJECT_OPTIONS.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EnrollStudentModal;
