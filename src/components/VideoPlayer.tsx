'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Video } from "@/app/dashboard/page";

export type VideoPlayerHandle = {
  togglePlay: () => void;
  skipTime: (seconds: number) => void;
  changePlaybackRate: () => void;
  isPlaying: boolean;
  playbackRate: number;
  formattedTimestamp: string;
};

export default function VideoPlayer({
  video,
  additionalVideos,
  onSelect,
  setIsPlaying,
  // setPlaybackRate,
  videoRef
}: {
  video: Video;
  additionalVideos: Video[];
  onSelect: (video: Video) => void;
  setIsPlaying: (val: boolean) => void;
  // setPlaybackRate: (rate: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video, setIsPlaying, videoRef]);

  return (
    <div className="relative px-6 pt-6">
      {/* Main player container */}
      <div className="relative w-full h-[525px] bg-black rounded-2xl overflow-hidden flex flex-col justify-between">
        <video
          ref={videoRef}
          key={video.videoUrl}
          className="w-full h-full object-cover"
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay: Camera ID */}
        <div className="absolute bottom-2 left-4 bg-black text-white text-sm px-3 py-1 rounded">
          🎥 Camera: {video.cameraId}
        </div>
      </div>

      {/* Additional Thumbnails */}
      {additionalVideos.length > 0 && (
        <div className="absolute bottom-4 right-4 flex gap-2 px-3">
          {additionalVideos.map((vid) => (
            <div key={vid.id} className="w-32 cursor-pointer">
              <div className="bg-black text-white text-xs text-center py-1 rounded-t-md">
                🎥 Camera: {vid.cameraId}
              </div>
              <Image
                src={vid.thumbnailUrl}
                alt={vid.title}
                width={128}
                height={72}
                className="rounded-b-md w-full h-[72px] object-cover"
                onClick={() => onSelect(vid)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
