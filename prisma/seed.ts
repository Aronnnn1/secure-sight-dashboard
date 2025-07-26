import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const camera1 = await prisma.camera.create({
    data: { name: 'Shop Floor A', location: 'Ground Floor' },
  });

  const camera2 = await prisma.camera.create({
    data: { name: 'Vault', location: 'Restricted Zone' },
  });

  const camera3 = await prisma.camera.create({
    data: { name: 'Entrance', location: 'Main Gate' },
  });

  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

  const types = ['Unauthorized Access', 'Gun Threat', 'Face Recognised'];
  const incidentMedia = [
    { id: 1, thumbnailUrl: '/thumbnails/incident1.jpg' },
    { id: 2, thumbnailUrl: '/thumbnails/incident2.jpg' },
    { id: 3, thumbnailUrl: '/thumbnails/incident3.jpg' },
  ];

  const cameraIncidentPlan = [
    { camera: camera1, repeat: 1 },
    { camera: camera2, repeat: 2 },
    { camera: camera3, repeat: 3 },
  ];

  let incidentIndex = 0;

  for (const { camera, repeat } of cameraIncidentPlan) {
    const uniqueIncidents = incidentMedia.filter((im) => im.id !== repeat);

    for (let i = 0; i < 2; i++) {
      const start = hoursAgo(24 - incidentIndex * 2);
      const end = new Date(start.getTime() + 10 * 60 * 1000);
      await prisma.incident.create({
        data: {
          cameraId: camera.id,
          type: types[repeat - 1],
          tsStart: start,
          tsEnd: end,
          thumbnailUrl: `/thumbnails/incident${repeat}.jpg`,
          resolved: false,
        },
      });
      incidentIndex++;
    }

    for (const im of uniqueIncidents) {
      const start = hoursAgo(24 - incidentIndex * 2);
      const end = new Date(start.getTime() + 10 * 60 * 1000);
      await prisma.incident.create({
        data: {
          cameraId: camera.id,
          type: types[im.id - 1],
          tsStart: start,
          tsEnd: end,
          thumbnailUrl: im.thumbnailUrl,
          resolved: false,
        },
      });
      incidentIndex++;
    }
  }

  console.log('✅ Seed data inserted.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
