// utils/incidents.ts

type Incident = {
  id: string;
  cameraId: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  location: string;
  timestamp: string;
};

// 3 base incidents
const baseIncidents = [
  {
    id: "inc1",
    title: "Unauthorized Access",
    videoUrl: "/videos/unauthorized-access.mp4",
    thumbnailUrl: "/images/unauthorized-access-thumb.jpg",
  },
  {
    id: "inc2",
    title: "Gun Threat",
    videoUrl: "/videos/gun-threat.mp4",
    thumbnailUrl: "/images/gun-threat-thumb.jpg",
  },
  {
    id: "inc3",
    title: "Slip and Fall",
    videoUrl: "/videos/slip-and-fall.mp4",
    thumbnailUrl: "/images/slip-and-fall-thumb.jpg",
  },
];

const cameras = ["cam1", "cam2", "cam3"];

export function generateIncidents(): Incident[] {
  const incidents: Incident[] = [];

  cameras.forEach((cameraId, camIndex) => {
    const repeatedIndex = camIndex; // 0 for cam1, 1 for cam2, etc.
    const used = new Set<number>();

    // Add repeated incident
    incidents.push({
      ...baseIncidents[repeatedIndex],
      id: `${cameraId}-repeated`,
      cameraId,
      location: `Camera ${cameraId.slice(-1)} - Shop Floor`,
      timestamp: "2025-07-22 14:00",
    });
    used.add(repeatedIndex);

    // Add 3 more from other incidents
    for (let i = 0; i < 3; i++) {
      const idx = (repeatedIndex + i + 1) % 3;
      if (!used.has(idx)) {
        incidents.push({
          ...baseIncidents[idx],
          id: `${cameraId}-inc${i}`,
          cameraId,
          location: `Camera ${cameraId.slice(-1)} - Shop Floor`,
          timestamp: `2025-07-22 14:0${i + 1}`,
        });
        used.add(idx);
      }
    }
  });

  return incidents;
}
