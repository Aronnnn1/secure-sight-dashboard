// /app/api/incidents/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // ✅ this line is needed
import type { Incident, Camera } from "@prisma/client";

type IncidentWithCamera = Incident & {
  camera: Camera;
};

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) { // ✅ typed request param
  const incidents = await prisma.incident.findMany({
    include: {
      camera: true,
    },
    orderBy: {
      tsStart: "desc",
    },
  });

  const formatted = incidents.map((i: IncidentWithCamera) => ({
    id: i.id,
    videoUrl: `/videos/incident${(i.id % 3) + 1}.mp4`, // mock mapping
    thumbnailUrl: i.thumbnailUrl,
    title: i.type,
    location: `${i.camera.name} - ${i.camera.location}`,
    timestamp: new Date(i.tsStart).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    resolved: i.resolved,
  }));

  return NextResponse.json(formatted);
}
