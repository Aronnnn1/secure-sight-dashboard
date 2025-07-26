'use client';

import Image from 'next/image';
import { Video } from "@/app/dashboard/page";

export default function VideoThumbnailGrid({
  videos,
  onSelect,
  onResolve,
  // selectedId,
}: {
  videos: Video[];
  onSelect: (video: Video) => void;
  onResolve: (id: number) => void;
  // selectedId?: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onSelect(video)}
        >
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={120}
            height={72}
            className="w-[120px] h-[72px] object-cover"
          />
          <div className="flex-1 text-sm">
            <p className="font-semibold">{video.title}</p>
            <p className="text-gray-500">{video.location}</p>
            <p className="text-gray-400 text-xs">
              {new Date(video.timestamp).toLocaleString()}
            </p>
          </div>
          {!video.resolved && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResolve(video.id);
              }}
              className="text-xs text-yellow-500 underline hover:text-yellow-600 mr-4"
            >
              Resolve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
