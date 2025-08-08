import { PrismaClient, MessageRole, MessageType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.fragment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.project.deleteMany();

  // Create a sample project with messages
  const project = await prisma.project.create({
    data: {
      name: 'example-project',
      messages: {
        create: [
          {
            content: 'Build a landing page with a hero and CTA',
            role: MessageRole.USER,
            type: MessageType.RESULT,
          },
          {
            content:
              'Generated files for a Tailwind landing page. See sandbox for live preview.',
            role: MessageRole.ASSISTANT,
            type: MessageType.RESULT,
          },
        ],
      },
    },
    include: { messages: true },
  });

  // Attach a fragment to the assistant message
  const assistantMessage = project.messages.find((m) => m.role === 'ASSISTANT');
  if (assistantMessage) {
    await prisma.fragment.create({
      data: {
        messageId: assistantMessage.id,
        sandboxUrl: 'https://example-sandbox.local',
        title: 'Fragment',
        files: {
          'app/page.tsx': '<div>Hello world</div>',
        },
      },
    });
  }

  console.log('✅ Database seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });