import { PaginatedResponse, Post } from "@/src/types";
import { NextApiRequest, NextApiResponse } from "next";

// Mock data - in real app, this would come from a database
const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  slug: `blog-post-${i + 1}`,
  content: `This is the content of blog post ${
    i + 1
  }. Lorem ipsum dolor sit amet.`,
  excerpt: `This is a short excerpt of blog post ${i + 1}.`,
  publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedPosts = mockPosts.slice(startIndex, endIndex);

  const response: PaginatedResponse<Post> = {
    data: paginatedPosts,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(mockPosts.length / limitNum),
      totalItems: mockPosts.length,
      itemsPerPage: limitNum,
    },
  };

  res.json(response);
}
