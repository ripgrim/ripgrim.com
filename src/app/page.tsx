import { NowPlaying } from "@/components/now-playing";
import { TRUNCATE_AFTER_CHARS } from "@/lib/constants";
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
              {posts
                .sort(
                  (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
                )
                .slice(0, 2)
                .map((post: Post) => (
                  <div key={post.id}>
                    <a className="group" href={`/blog/${post.slug}`}>
                      <h3 className="mb-2 text-foreground transition-colors group-hover:text-muted-foreground">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.description &&
                        post.description.length > TRUNCATE_AFTER_CHARS
                          ? `${post.description.slice(0, TRUNCATE_AFTER_CHARS)}...`
                          : post.description || ""}
                      </p>
                    </a>
                  </div>
                ))}

              {posts.length > 2 && (
                <div>
                  <a className="group" href="/blog">
                    <h3 className="mb-2 text-foreground transition-colors group-hover:text-muted-foreground">
                      View {posts.length - 2} more posts
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
        <div className="mb-16 print:hidden">
          <h2 className="mb-6 block text-muted-foreground text-sm md:hidden">
            What I&apos;m listening to
          </h2>

          <div className="space-y-6">
            <NowPlaying className="fixed right-[10px] bottom-[10px] z-50 w-[450px]" />
          </div>
        </div>
      </div>
    </main>
  );
}
