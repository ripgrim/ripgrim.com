import { getPosts } from "@/lib/query";
import type { Post } from "@/types/post";

export default async function Home() {
  const postsData = await getPosts();
  const { posts } = postsData;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="mb-16">
          <h1 className="mb-8 text-2xl text-foreground">grim</h1>

          <div className="mb-12 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">
                professional fuckarounder
              </span>{" "}
              — scratching unscratchable itches and building whatever I want.
            </p>

            {/* <p className="text-muted-foreground leading-relaxed">
              In the past I've developed the Vercel design system, website, and
              dashboard.
            </p> */}
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-16 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-muted-foreground text-sm">Building</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-foreground">
                  ill write something here some day
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-muted-foreground text-sm">Projects</h2>

            <div className="space-y-6">
              <div>
                <a
                  className="group"
                  href="https://bounty.new"
                  rel="noopener"
                  target="_blank"
                >
                  <h3 className="mb-2 text-foreground transition-colors group-hover:text-muted-foreground">
                    Bounty.new ↗
                  </h3>
                  {/* <p className="text-muted-foreground text-sm leading-relaxed">
                    Composable command menu React component.
                  </p> */}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-muted-foreground text-sm">Writing</h2>

            <div className="space-y-6">
              {posts.map((post: Post) => (
                <div key={post.id}>
                  <a className="group" href={`/blog/${post.slug}`}>
                    <h3 className="mb-2 text-foreground transition-colors group-hover:text-muted-foreground">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.description || ""}
                    </p>
                  </a>
                </div>
              ))}

              {posts.length > 1 && (
                <div>
                  <a className="group" href="/blog">
                    <h3 className="mb-2 text-foreground transition-colors group-hover:text-muted-foreground">
                      All posts
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      grim, unfiltered, not that it matters.
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-muted-foreground text-sm">Now</h2>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              ill write something here some day {""}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
