// 📄 frontend/src/pages/VideoManagement.jsx
import { useState, useEffect } from "react";
import { Button, Tag, message, Spin, Empty } from "antd";
import {
  CalendarOutlined,
  TagsOutlined,
  ArrowRightOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getAllVideos } from "../services/videoService";
import AddVideoModal from "../components/Students/AddVideoModal";
import AssignBatchModal from "../components/Students/AssignBatchModal";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals visibility states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // 🌟 FIXED: Ab sirf ID ke badle poora video object state track karega
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 🌟 Database se videos fetch karne ka function
  const fetchVideos = async () => {
    try {
      const response = await getAllVideos();
      if (response.success) {
        setVideos(response.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load lecture repository library.");
    } finally {
      setLoading(false);
    }
  };

  // 🌟 Asynchronous call wrapper inside useEffect to prevent synchronous state cascading warning
  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchVideos();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🌟 FIXED: Jab admin kisi card par "Assign To Batch" dabaye, pura object state me save hoga
  const handleOpenAssignModal = (videoObject) => {
    setSelectedVideo(videoObject);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="p-1">
      {/* Header Bar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <VideoCameraOutlined className="text-[#fb991d]" />
            <span>Video Access Management</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your unlisted video library, assign sessions to target course
            batches, and automate emails.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#fb991d] hover:bg-[#e08516] text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 flex items-center gap-2"
        >
          + Add New Video
        </button>
      </div>

      {/* Main Content Workspace */}
      <Spin spinning={loading} tip="Loading Video Library Repository...">
        {videos.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm flex justify-center items-center">
            <Empty description="No lectures found in the library repository. Click '+ Add New Video' to deploy." />
          </div>
        ) : (
          /* Grid Matrix for Videos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                {/* Top Section: Video Meta/Thumbnail */}
                <div>
                  <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      YouTube Lecture
                    </div>
                  </div>

                  {/* Body Context Details */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-800 line-clamp-1 mb-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-3">
                      <CalendarOutlined />
                      <span>
                        {new Date(video.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">
                      {video.description}
                    </p>

                    {/* Assigned Batches Mapping Layout */}
                    <div className="border-t border-gray-50/80 pt-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                        <TagsOutlined /> Assigned Batches
                      </span>
                      <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                        {video.assignedBatches &&
                        video.assignedBatches.length > 0 ? (
                          video.assignedBatches.map((batch) => (
                            <Tag
                              key={batch}
                              color="orange"
                              className="font-semibold text-xs rounded border-orange-100"
                            >
                              {batch}
                            </Tag>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            None (Unassigned)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Action Trigger Footer Button */}
                <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                  <Button
                    type="default"
                    block
                    icon={<ArrowRightOutlined />}
                    onClick={() => handleOpenAssignModal(video)} // 🌟 FIXED: Pura video object pass ho rha h
                    className="h-9 border-gray-200 font-semibold text-gray-700 hover:text-[#fb991d] hover:border-[#fb991d] rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    Assign To Batch
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Spin>

      {/* 🎬 Render Add New Video Modal Overlay Component */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={fetchVideos}
      />

      {/* 🎬 Render Assign Batch Overlay Component */}
      <AssignBatchModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        videoData={selectedVideo} // 🌟 FIXED: videoId aur title ke badle poora object bhej diya
        onRefresh={fetchVideos}
      />
    </div>
  );
};

export default VideoManagement;
