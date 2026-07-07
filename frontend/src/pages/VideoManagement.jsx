import { useState, useEffect } from "react";
import { Button, Tag, message, Spin, Empty, Popconfirm } from "antd";
import {
  CalendarOutlined,
  TagsOutlined,
  ArrowRightOutlined,
  VideoCameraOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getAllVideos, deleteVideoFromLibrary } from "../services/videoService";
import AddVideoModal from "../components/Students/AddVideoModal";
import AssignBatchModal from "../components/Students/AssignBatchModal";
import EditVideoModal from "../components/Students/EditVideoModal";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState(null);

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

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) await fetchVideos();
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenAssignModal = (videoObject) => {
    setSelectedVideo(videoObject);
    setIsAssignModalOpen(true);
  };

  const handleOpenEditModal = (videoObject) => {
    setSelectedVideo(videoObject);
    setIsEditModalOpen(true);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await deleteVideoFromLibrary(videoId);
      if (response.success) {
        message.success(response.message || "Video removed successfully.");
        fetchVideos();
      }
    } catch (error) {
      message.error(error.message || "Failed to delete video");
    }
  };

  return (
    <div className="p-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <VideoCameraOutlined className="text-[#fb991d]" />
            <span>Video Access Management</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your unlisted video library, assign sessions, edit details,
            and remove videos.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#fb991d] hover:bg-[#e08516] text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 flex items-center gap-2"
        >
          + Add New Video
        </button>
      </div>

      <Spin spinning={loading} tip="Loading Video Library Repository...">
        {videos.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm flex justify-center items-center">
            <Empty description="No lectures found in the library repository." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* 🌟 FIXED: Aspect Video Section Jisme image strictly bounds me rahegi */}
                  <div className="relative aspect-video w-full bg-gray-900 overflow-hidden block">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt="Lecture Preview"
                        className="w-full h-full object-cover opacity-90 block"
                        onError={(e) => {
                          // Safe backup image agar koi URL fail ho jaye
                          e.target.src =
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400 text-xs">
                        No Thumbnail Available
                      </div>
                    )}

                    {/* Action Buttons on top right corner of Thumbnail with explicit z-index */}
                    <div className="absolute top-2 right-2 flex gap-1.5 z-20">
                      <Button
                        type="primary"
                        shape="circle"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEditModal(video)}
                        className="bg-white/90 text-gray-700 hover:text-[#fb991d] border-none shadow-sm flex items-center justify-center"
                      />
                      <Popconfirm
                        title="Delete Lecture"
                        description="Are you sure you want to delete this video from the repository?"
                        onConfirm={() => handleDeleteVideo(video._id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          type="primary"
                          danger
                          shape="circle"
                          size="small"
                          icon={<DeleteOutlined />}
                          className="bg-white/90 text-red-600 border-none shadow-sm flex items-center justify-center"
                        />
                      </Popconfirm>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider z-10">
                      YouTube Lecture
                    </div>
                  </div>

                  {/* 🌟 FIXED: Content wrapper blocks title here cleanly below thumbnail */}
                  <div className="p-4 bg-white relative block">
                    <h3 className="text-base font-bold text-gray-800 line-clamp-1 mb-1 relative block">
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
                      {video.description || "No description provided."}
                    </p>

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

                <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                  <Button
                    type="default"
                    block
                    icon={<ArrowRightOutlined />}
                    onClick={() => handleOpenAssignModal(video)}
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

      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={fetchVideos}
      />

      <AssignBatchModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        videoData={selectedVideo}
        onRefresh={fetchVideos}
      />

      <EditVideoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        videoData={selectedVideo}
        onRefresh={fetchVideos}
      />
    </div>
  );
};

export default VideoManagement;
