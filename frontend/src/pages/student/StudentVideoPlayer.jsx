// 📄 frontend/src/pages/student/StudentVideoPlayer.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useStudentAuth } from "../../context/StudentAuthContext";
import { getVideoAccess } from "../../services/studentService";
import axios from "axios";

const StudentVideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { student } = useStudentAuth();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlayerWorkspace = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Current Video details fetch karo backend se
        const videoRes = await getVideoAccess(videoId);
        if (videoRes.success) {
          setCurrentVideo(videoRes.data);
        }

        // 2. Playlist ke liye usi batch ki baaki saari videos bhi fetch kar lo
        // 📄 frontend/src/pages/student/StudentVideoPlayer.jsx ke andar loadPlayerWorkspace check karo:
        const batchRes = await axios.get(
          `http://localhost:5000/api/students/my-batch-videos/${student.batch}`,
          {
            withCredentials: true,
          },
        );
        if (batchRes.data.success) {
          setPlaylist(batchRes.data.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load video workspace. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (student?.batch && videoId) {
      loadPlayerWorkspace();
    }
  }, [videoId, student]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 animate-pulse flex flex-col gap-4">
        <div className="bg-gray-200 aspect-video w-full rounded-2xl"></div>
        <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 text-red-600 rounded-2xl max-w-3xl mx-auto mt-6">
        ⚠️ {error}
        <button
          onClick={() => navigate("/student/portal")}
          className="block mt-4 text-sm font-bold text-[#14212a] underline"
        >
          &larr; Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-2">
      {/* 🎬 LEFT: Video Player & Info */}
      <div className="flex-1 flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => navigate("/student/portal")}
          className="mb-4 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#14212a] transition-colors max-w-max bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
        >
          &larr; Back to Dashboard
        </button>

        {/* Professional YouTube Embed Iframe Wrapper */}
        <div className="bg-black rounded-2xl aspect-video w-full overflow-hidden shadow-lg relative">
          {currentVideo?.youtubeVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.youtubeVideoId}?rel=0&modestbranding=1`}
              title={currentVideo.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-white text-center flex items-center justify-center h-full">
              Invalid Video Stream ID
            </div>
          )}
        </div>

        {/* Video Description Metadata Card */}
        <div className="bg-white rounded-2xl border border-[#eef2f5] shadow-sm p-5 mt-5">
          <span className="bg-[#fb991d]/10 text-[#fb991d] px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border border-[#fb991d]/20">
            {student?.batch} Ecosystem
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#14212a] mt-3 mb-1">
            {currentVideo?.title}
          </h1>
          <p className="text-[11px] text-gray-400 font-semibold mb-4">
            🗓️ Uploaded:{" "}
            {new Date(currentVideo?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <hr className="border-gray-100 my-3" />
          <h4 className="text-xs font-bold uppercase text-[#14212a] tracking-wider mb-1">
            Lecture Overview
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">
            {currentVideo?.description ||
              "No customized documentation logs updated for this specific lecture."}
          </p>
        </div>
      </div>

      {/* 📑 RIGHT: Sidebar Playlist */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col">
        <div className="bg-white rounded-2xl border border-[#eef2f5] shadow-sm overflow-hidden sticky top-6">
          <div className="bg-[#14212a] p-4 text-white">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-200">
              Course Playlist
            </h3>
            <p className="text-[10px] text-[#fb991d] font-bold mt-0.5">
              {playlist.length} Modules Synchronized
            </p>
          </div>

          <div className="max-h-[50vh] lg:max-h-[65vh] overflow-y-auto divide-y divide-gray-50">
            {playlist.map((track, idx) => {
              const isCurrent = track._id === videoId;
              return (
                <div
                  key={track._id}
                  onClick={() =>
                    !isCurrent && navigate(`/student/watch/${track._id}`)
                  }
                  className={`p-4 flex gap-3 cursor-pointer transition-all items-start select-none ${
                    isCurrent
                      ? "bg-[#fb991d]/5 border-l-4 border-l-[#fb991d]"
                      : "hover:bg-gray-50 border-l-4 border-l-transparent"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex shrink-0 items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? "bg-[#fb991d] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isCurrent ? "text-[#fb991d]" : "text-[#14212a]"
                      }`}
                    >
                      {track.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVideoPlayer;
