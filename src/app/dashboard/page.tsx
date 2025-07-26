"use client";

import { useRef, useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import VideoControlBar from "@/components/VideoControlBar";
import VideoThumbnailGrid from "@/components/VideoThumbnailGrid";
import { useIncidentStore } from "@/lib/incidentStore";

export type Video = {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  location: string;
  timestamp: string;
  resolved: boolean;
  cameraId: number;
};

// Hardcoded initial data
const initialVideos: Video[] = [
  { id: 1, videoUrl: "/videos/incident1.mp4", thumbnailUrl: "/thumbnails/incident1.jpg", title: "Unauthorised Access", location: "Shop Floor A", timestamp: "2025-07-23T03:20:00", resolved: false, cameraId: 1 },
  { id: 2, videoUrl: "/videos/incident2.mp4", thumbnailUrl: "/thumbnails/incident2.jpg", title: "Gun Threat", location: "Vault", timestamp: "2025-07-23T05:45:00", resolved: false, cameraId: 1 },
  { id: 3, videoUrl: "/videos/incident3.mp4", thumbnailUrl: "/thumbnails/incident3.jpg", title: "Face Recognised", location: "Entrance", timestamp: "2025-07-23T06:10:00", resolved: false, cameraId: 1 },
  { id: 4, videoUrl: "/videos/incident1.mp4", thumbnailUrl: "/thumbnails/incident1.jpg", title: "Face Recognised", location: "Vault", timestamp: "2025-07-23T07:30:00", resolved: false, cameraId: 1 },
  { id: 5, videoUrl: "/videos/incident2.mp4", thumbnailUrl: "/thumbnails/incident2.jpg", title: "Gun Threat", location: "Shop Floor A", timestamp: "2025-07-23T09:10:00", resolved: false, cameraId: 2 },
  { id: 6, videoUrl: "/videos/incident3.mp4", thumbnailUrl: "/thumbnails/incident3.jpg", title: "Unauthorised Access", location: "Entrance", timestamp: "2025-07-23T10:40:00", resolved: false, cameraId: 2 },
  { id: 7, videoUrl: "/videos/incident1.mp4", thumbnailUrl: "/thumbnails/incident1.jpg", title: "Gun Threat", location: "Vault", timestamp: "2025-07-23T11:25:00", resolved: false, cameraId: 2 },
  { id: 8, videoUrl: "/videos/incident2.mp4", thumbnailUrl: "/thumbnails/incident2.jpg", title: "Unauthorised Access", location: "Entrance", timestamp: "2025-07-23T12:15:00", resolved: false, cameraId: 2 },
  { id: 9, videoUrl: "/videos/incident3.mp4", thumbnailUrl: "/thumbnails/incident3.jpg", title: "Face Recognised", location: "Shop Floor A", timestamp: "2025-07-23T13:40:00", resolved: false, cameraId: 3 },
  { id: 10, videoUrl: "/videos/incident1.mp4", thumbnailUrl: "/thumbnails/incident1.jpg", title: "Gun Threat", location: "Vault", timestamp: "2025-07-23T14:55:00", resolved: false, cameraId: 3 },
  { id: 11, videoUrl: "/videos/incident2.mp4", thumbnailUrl: "/thumbnails/incident2.jpg", title: "Unauthorised Access", location: "Shop Floor A", timestamp: "2025-07-23T15:20:00", resolved: false, cameraId: 3 },
  { id: 12, videoUrl: "/videos/incident3.mp4", thumbnailUrl: "/thumbnails/incident3.jpg", title: "Face Recognised", location: "Entrance", timestamp: "2025-07-23T16:05:00", resolved: false, cameraId: 3 },
];

export default function Dashboard() {
  const { videos, setVideos, resolveIncident } = useIncidentStore();
  const [selectedIncident, setSelectedIncident] = useState<Video | null>(null);
  const [showResolved, setShowResolved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videos.length === 0) {
      setVideos(initialVideos);
    }
  }, [setVideos, videos.length]);

  const visibleVideos = videos.filter((video) => video.resolved === showResolved);
  const unresolvedCount = videos.filter((v) => !v.resolved).length;
  const resolvedCount = videos.filter((v) => v.resolved).length;

  useEffect(() => {
    const newVisible = videos.filter((v) => v.resolved === showResolved);
    if (!selectedIncident || !newVisible.some((v) => v.id === selectedIncident.id)) {
      setSelectedIncident(newVisible[0] || null);
    }
  }, [selectedIncident, showResolved, videos]);

  const selectedIndex = visibleVideos.findIndex((v) => v.id === selectedIncident?.id);
  const nextTwoVideos = selectedIndex >= 0 ? visibleVideos.slice(selectedIndex + 1, selectedIndex + 3) : [];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIndex];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const formattedTimestamp = selectedIncident
    ? new Date(selectedIncident.timestamp).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div className="flex flex-col h-[650px]">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-[950px] px-4 pt-4 overflow-hidden h-[700px]">
          {selectedIncident && (
            <VideoPlayer
              video={selectedIncident}
              additionalVideos={nextTwoVideos}
              onSelect={(video) => setSelectedIncident(video)}
              setIsPlaying={setIsPlaying}
              // setPlaybackRate={setPlaybackRate}
              videoRef={videoRef}
            />
          )}
        </div>

        <div className="w-[522px] p-4 max-h-[560px] overflow-y-auto pr-2 hover:pr-0 custom-scrollbar transition-all duration-300">
          <div className="flex justify-between items-center mb-6 px-1">
            <button
              className={`flex items-center gap-1.5 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                !showResolved ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setShowResolved(false)}
            >
              <span className="inline-block w-[10px] h-[10px] bg-red-500 rounded-full"></span>
              {unresolvedCount} Unresolved Incidents
            </button>
            <button
              className={`flex items-center gap-1.5 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                showResolved ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setShowResolved(true)}
            >
              <span className="inline-block w-[10px] h-[10px] bg-green-500 rounded-full"></span>
              {resolvedCount} Resolved
            </button>
          </div>

          <VideoThumbnailGrid
            videos={visibleVideos}
            onSelect={(video) => setSelectedIncident(video)}
            onResolve={(id) => resolveIncident(id)}
            // selectedId={selectedIncident?.id}
          />
        </div>
      </div>

      <div className="px-4 -mt-3">
        <div className="w-[950px]">
          <VideoControlBar
            onPlayToggle={togglePlay}
            onRewind={() => skipTime(-5)}
            onForward={() => skipTime(5)}
            onPrev={() =>
              selectedIndex > 0 && setSelectedIncident(visibleVideos[selectedIndex - 1])
            }
            onNext={() => nextTwoVideos[0] && setSelectedIncident(nextTwoVideos[0])}
            onSpeedChange={changePlaybackRate}
            isPlaying={isPlaying}
            timestamp={formattedTimestamp}
            playbackRate={playbackRate}
            hasPrevVideo={selectedIndex > 0}
            hasNextVideo={!!nextTwoVideos[0]}
          />
        </div>
      </div>
    </div>
  );
}
