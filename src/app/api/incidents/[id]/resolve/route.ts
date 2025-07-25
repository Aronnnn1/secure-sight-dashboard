import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return new NextResponse('Invalid ID', { status: 400 });
  }

  try {
    const existing = await prisma.incident.findUnique({ where: { id } });

    if (!existing) {
      return new NextResponse('Incident not found', { status: 404 });
    }

    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: !existing.resolved },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating incident:', error);
    return new NextResponse('Failed to update incident', { status: 500 });
  }
}
