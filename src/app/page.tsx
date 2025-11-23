import { apiClient } from "@/lib/api-client"; // assumes you already fetch from your backend
import VideoPlayer from "./components/VideoPlayer";
export default async function Home() {
  const videos = await apiClient.getVideos(); // returns IVideo[]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <div
          key={video._id?.toString()}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <VideoPlayer
            videoUrl={video.videoUrl}
            poster={video.videoUrl + video.thumbnailUrl}
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {video.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
