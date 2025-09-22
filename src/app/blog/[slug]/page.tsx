import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { getSinglePost } from "@/lib/query";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getSinglePost(slug);

  if (!postData) {
    notFound();
  }

  const { post } = postData;

  console.log("post", post);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 pt-20">
        <header className="mb-12">
          <h1 className="mb-4 font-medium text-2xl text-foreground">
            <a
              className="mr-2 text-muted-foreground transition-colors hover:text-foreground"
              href="/"
            >
              ←
            </a>
            {post.title}
          </h1>

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
        </header>
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-20">
        {post.coverImage && (
          <div className="mb-8">
            <Image
              alt=""
              className="h-64 w-full rounded-lg object-cover opacity-90"
              height={100}
              src={post.coverImage}
              width={100}
            />
          </div>
        )}

        <Prose html={post.content} />
      </div>
    </main>
  );
}
