export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: [];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}
