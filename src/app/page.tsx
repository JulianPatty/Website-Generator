import { prisma } from "@/lib/db";

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-800">{post.content}</p>
            {!post.published && (
              <span className="inline-block mt-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                Draft
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 