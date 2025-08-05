import { PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'john@example.com',
    name: 'John Doe',
  },
  
]
async function main() {
  console.log('🌱 Seeding database...')
  
  // Clear existing data
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  
  // Create users
  const john = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Doe',
    },
  })
  
  const jane = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      name: 'Jane Smith',
    },
  })
  
  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Johnson',
    },
  })
  
  console.log('✅ Created 3 users')
  
  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Getting Started with Prisma',
        content: 'Prisma is a next-generation ORM that helps you build type-safe database queries...',
        published: true,
        authorId: john.id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Modern Web Apps with Next.js',
        content: 'Next.js provides an excellent developer experience with features like...',
        published: true,
        authorId: john.id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'TypeScript Best Practices',
        content: 'When working with TypeScript, following these best practices will help...',
        published: true,
        authorId: jane.id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Draft: Upcoming Features',
        content: 'In the next release, we plan to introduce several exciting features...',
        published: false,
        authorId: jane.id,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Database Design Patterns',
        content: 'Understanding common database design patterns is crucial for building...',
        published: true,
        authorId: bob.id,
      },
    }),
  ])
  
  console.log(`✅ Created ${posts.length} posts`)
  console.log('✅ Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })