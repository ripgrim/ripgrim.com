export type MarblePost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author?: MarbleAuthor;
  categories?: MarbleCategory[];
  tags?: MarbleTag[];
  featuredImage?: string;
  status: "published" | "draft";
  coverImage?: string;
};

export type MarblePostList = {
  posts: MarblePost[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export type MarbleAuthor = {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export type MarbleAuthorList = {
  authors: MarbleAuthor[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export type MarbleCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type MarbleCategoryList = {
  categories: MarbleCategory[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export type MarbleTag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type MarbleTagList = {
  tags: MarbleTag[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};
