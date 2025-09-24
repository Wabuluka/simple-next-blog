import Pagination from "@/src/components/common/Pagination";
import { PaginatedResponse, Post } from "@/src/types";
import { GetServerSideProps } from "next";

interface BlogPageProps {
  postsResponse: PaginatedResponse<Post>;
}

export default function BlogPage({ postsResponse }: BlogPageProps) {
  const { data: posts, pagination } = postsResponse;

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div className="posts-grid">
        {posts.map((post: Post) => (
          <article key={post?.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
      <Pagination pagination={pagination} basePath="/blog" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || "1";

  try {
    const response = await fetch(
      `http://localhost:3000/api/posts?page=${page}&limit=10`
    );
    const postsResponse: PaginatedResponse<Post> = await response.json();

    return {
      props: {
        postsResponse,
      },
    };
  } catch (error) {
    return {
      props: {
        postsResponse: {
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10,
          },
        },
      },
    };
  }
};
