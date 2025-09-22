import { getPosts } from "@/lib/query";
import type { Post } from "@/types/post";

export default async function BlogPage() {
  const postsData = await getPosts();
  const { posts } = postsData;

  const descriptionLengthBeforeTruncate = 100;

  if (!posts) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="mb-8 text-2xl text-foreground">Blog</h1>
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="mb-8 text-2xl text-foreground">
          Blog (powered by marble cms)
        </h1>

        <div className="space-y-8">
          {posts.map((post: Post) => (
            <article
              className="border-border border-b pb-8 last:border-b-0"
              key={post.id}
            >
              <h2 className="mb-2 text-foreground text-xl">
                <a
                  className="transition-colors hover:text-muted-foreground"
                  href={`/blog/${post.slug}`}
                >
                  {post.title}
                </a>
              </h2>

              {post.description && (
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {post.description.slice(0, descriptionLengthBeforeTruncate)}
                  {post.description.length > descriptionLengthBeforeTruncate &&
                    "..."}
                </p>
              )}

              <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt.toString()}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}

                {post.authors && (
                  <span>
                    by {post.authors.map((author) => author.name).join(", ")}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
