// const VideoPlayCard = ({ video }) => {
//   const handleWatchVideo = () => {
//     window.open(
//       `https://www.youtube.com/watch?v=${video.youtubeVideoId}`,
//       "_blank",
//       "noopener,noreferrer",
//     );
//   };
//   return (
//     <div className="bg-white rounded-2xl border border-[#eef2f5] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
//       <div>
//         {/* Interactive Simulated Video Overlay Covering Grid Layout */}
//         <div className="bg-gradient-to-br from-[#14212a] to-[#1c3242] aspect-video w-full flex items-center justify-center relative overflow-hidden cursor-pointer">
//           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fb991d_1px,transparent_1px)] [background-size:16px_16px]"></div>
//           <div className="w-12 h-12 bg-[#fb991d] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md transform group-hover:scale-110 transition-transform z-10">
//             ▶
//           </div>
//           <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
//             Premium Module
//           </span>
//         </div>

//         {/* Text Container Parameters */}
//         <div className="p-5">
//           <h3 className="font-extrabold text-[#14212a] text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#fb991d] transition-colors">
//             {video.title}
//           </h3>
//           <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
//             {video.description ||
//               "No customized documentation logs updated for this specific tracking system matrix lecture."}
//           </p>
//         </div>
//       </div>

//       {/* Footer Meta Row */}
//       <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-semibold bg-gray-50/50">
//         <span className="flex items-center gap-1">
//           🗓️{" "}
//           {new Date(video.createdAt).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </span>
//         {/* <button className="text-[#fb991d] group-hover:translate-x-1 transition-transform font-bold uppercase tracking-wider text-[11px]">
//           Watch Module &rarr;
//         </button> */}
//         <button
//           onClick={handleWatchVideo}
//           className="text-[#fb991d] group-hover:translate-x-1 transition-transform font-bold uppercase tracking-wider text-[11px]"
//         >
//           Watch Module →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayCard;

// 📄 frontend/src/components/StudentPortal/VideoPlayCard.jsx

import { useNavigate } from "react-router-dom"; // 🌟 React Router ka hook navigate karne ke liye

const VideoPlayCard = ({ video }) => {
  const navigate = useNavigate(); // 🌟 Navigation hook initialize kiya

  const handleWatchVideo = () => {
    // ❌ Purana window.open() poora hata diya taaki YouTube par redirect na ho
    // 🌟 Apne naye portal route par bhej rahe hain video._id ke sath
    navigate(`/student/watch/${video._id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#eef2f5] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      {/* 🌟 Puri upar ki body aur image ko clickable bana diya */}
      <div onClick={handleWatchVideo} className="cursor-pointer">
        {/* Interactive Simulated Video Overlay Covering Grid Layout */}
        <div className="bg-gradient-to-br from-[#14212a] to-[#1c3242] aspect-video w-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fb991d_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="w-12 h-12 bg-[#fb991d] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md transform group-hover:scale-110 transition-transform z-10">
            ▶
          </div>
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Premium Module
          </span>
        </div>

        {/* Text Container Parameters */}
        <div className="p-5">
          <h3 className="font-extrabold text-[#14212a] text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#fb991d] transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {video.description ||
              "No customized documentation logs updated for this specific tracking system matrix lecture."}
          </p>
        </div>
      </div>

      {/* Footer Meta Row */}
      <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-semibold bg-gray-50/50">
        <span className="flex items-center gap-1">
          🗓️{" "}
          {new Date(video.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {/* 🌟 Niche ka button bhi naye custom player par redirect karega */}
        <button
          onClick={handleWatchVideo}
          className="text-[#fb991d] group-hover:translate-x-1 transition-transform font-bold uppercase tracking-wider text-[11px]"
        >
          Watch Module →
        </button>
      </div>
    </div>
  );
};

export default VideoPlayCard;
