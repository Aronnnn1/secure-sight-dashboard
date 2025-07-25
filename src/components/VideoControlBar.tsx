'use client';
import { Rewind, FastForward, Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function VideoControlBar({
  onPlayToggle,
  onRewind,
  onForward,
  onPrev,
  onNext,
  onSpeedChange,
  isPlaying,
  timestamp,
  playbackRate,
  hasPrevVideo,
  hasNextVideo,
}: {
  onPlayToggle: () => void;
  onRewind: () => void;
  onForward: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSpeedChange: () => void;
  isPlaying: boolean;
  timestamp: string;
  playbackRate: number;
  hasPrevVideo: boolean;
  hasNextVideo: boolean;
}) {
  return (
    <div className="mt-1 ml-6 w-[1430px] bg-[#2D2D2D] rounded-md shadow px-6 py-3 flex items-center gap-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          disabled={!hasPrevVideo}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={onRewind}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        >
          <Rewind size={16} />
        </button>
        <button
          onClick={onPlayToggle}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={onForward}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        >
          <FastForward size={16} />
        </button>
        <button
          onClick={onNext}
          disabled={!hasNextVideo}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        >
          <SkipForward size={16} />
        </button>
      </div>

      <div className="mt-1 flex items-center gap-4 ml-6">
        <div className="text-sm text-white">{timestamp}</div>
        <button
          onClick={onSpeedChange}
          className="bg-[#2D2D2D] text-white text-sm px-2 py-1 rounded"
        >
          {playbackRate}x
        </button>
      </div>
    </div>
  );
}
