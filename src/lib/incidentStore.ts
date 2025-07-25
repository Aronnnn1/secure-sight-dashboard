import { create } from "zustand";

export type Video = {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  location: string;
  timestamp: string;
  cameraId: number;
  resolved: boolean;
};

type IncidentStore = {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  resolveIncident: (id: number) => void;
};

export const useIncidentStore = create<IncidentStore>((set) => ({
  videos: [],
  setVideos: (videos) => set({ videos }),
  resolveIncident: (id) =>
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === id ? { ...video, resolved: true } : video
      ),
    })),
}));
