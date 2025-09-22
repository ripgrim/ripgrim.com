import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import type {
  MarbleAuthorList,
  MarbleCategoryList,
  MarblePost,
  MarblePostList,
  MarbleTagList,
} from "@/types/post";

const url = process.env.NEXT_PUBLIC_MARBLE_API_URL;
const key = process.env.MARBLE_WORKSPACE_KEY;

async function fetchFromMarble<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${url}/${key}/${endpoint}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`
    );
  }
  return (await response.json()) as T;
}

export async function getPosts() {
  return await fetchFromMarble<MarblePostList>("posts");
}

export async function getTags() {
  return await fetchFromMarble<MarbleTagList>("tags");
}

export async function getSinglePost(slug: string) {
  return await fetchFromMarble<MarblePost>(`posts/${slug}`);
}

export async function getCategories() {
  return await fetchFromMarble<MarbleCategoryList>("categories");
}

export async function getAuthors() {
  return await fetchFromMarble<MarbleAuthorList>("authors");
}

export async function processHtmlContent(html: string): Promise<string> {
  const processor = unified()
    .use(rehypeSanitize)
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "append" })
    .use(rehypeStringify);

  const file = await processor.process(html);
  return String(file);
}
