import { useState, useEffect } from "react";
import { Card, List, Tabs, Modal, Tag, Empty, Skeleton, message } from "antd";
import {
  FileTextOutlined,
  RobotOutlined,
  BookOutlined,
  KeyOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { fetchAllAvailableNotesAPI } from "../../services/studentService";

const { TabPane } = Tabs;

const AiNotesLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [notesList, setNotesList] = useState([]);
  const [activeNotes, setActiveNotes] = useState(null);
  const [viewVisible, setViewVisible] = useState(false);

  useEffect(() => {
    loadNotesPool();
  }, []);

  const loadNotesPool = async () => {
    try {
      setLoading(true);
      const res = await fetchAllAvailableNotesAPI();
      console.log("FULL RESPONSE", res);
console.log("DATA", res.data);
console.log("NOTES", res.data.data);
      if (res.data.success) {
        setNotesList(res.data.data);
      }
      console.log("STATE", res.data.data.length);
    } catch (err) {
      console.error(err);
      message.error("Failed to compile repository matrix mapping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-black text-[#14212a] m-0 flex items-center gap-2">
          <RobotOutlined className="text-[#fb991d]" /> AI Study Notes Hub
        </h2>
        <p className="text-gray-400 text-xs mt-1 font-medium">
          Read high fidelity structured breakdowns of all your modules.
        </p>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : notesList.length === 0 ? (
        <Empty
          description="No lecture notes repositories ready inside system architecture yet."
          className="my-12"
        />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={notesList}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                className="border-[#eef2f5] rounded-xl hover:shadow-md transition-all duration-300"
                onClick={() => {
                  setActiveNotes(item);
                  setViewVisible(true);
                }}
              >
                <div className="flex items-start gap-3">
                  <FileTextOutlined className="text-lg text-[#fb991d] mt-1" />
                  <div className="w-full">
                    <h4 className="font-bold text-[#14212a] text-sm m-0 truncate">
                      {item.videoTitle}
                    </h4>
                    <Tag color="success" className="font-bold rounded-md mt-3">
                      Ready
                    </Tag>
                  </div>
                  <RightOutlined className="text-gray-300 text-xs mt-2" />
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}

      {/* 📑 Premium Structured Notes Drawer/Modal View */}
      <Modal
        title={
          <span className="font-black text-[#14212a]">
            📄 {activeNotes?.videoTitle}
          </span>
        }
        open={viewVisible}
        onCancel={() => setViewVisible(false)}
        footer={null}
        width={750}
        centered
        destroyOnClose
      >
        {activeNotes && (
          <Tabs
            defaultActiveKey="1"
            className="custom-ai-tabs font-semibold mt-4"
          >
            <TabPane
              tab={
                <span>
                  <BookOutlined /> Summary
                </span>
              }
              key="1"
            >
              <div className="p-4 bg-gray-50/70 rounded-xl text-gray-700 leading-relaxed text-sm font-medium">
                {activeNotes.shortSummary}
              </div>
            </TabPane>
            <TabPane tab={<span>📝 Detailed Study Notes</span>} key="2">
              <div className="p-4 bg-white border border-gray-100 rounded-xl text-gray-800 text-sm leading-loose whitespace-pre-wrap font-medium max-h-[400px] overflow-y-auto">
                {activeNotes.detailedNotes}
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <KeyOutlined /> Key Concepts
                </span>
              }
              key="3"
            >
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {activeNotes.keyPoints?.map((kp, idx) => (
                  <div
                    key={kp._id || idx}
                    className="p-3 bg-gray-50/50 rounded-xl border border-gray-100"
                  >
                    <div className="font-extrabold text-[#14212a] text-xs uppercase tracking-wide">
                      {kp.heading}
                    </div>
                    <div className="text-gray-600 text-xs font-semibold mt-1">
                      {kp.description}
                    </div>
                  </div>
                ))}
              </div>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
};

export default AiNotesLibrary;
