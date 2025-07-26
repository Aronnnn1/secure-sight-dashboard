// app/api/incidents/[id]/resolve/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });

    return NextResponse.json(updatedIncident);
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }
}
