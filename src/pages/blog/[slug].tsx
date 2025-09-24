import { Post } from "@/src/types";
import { GetStaticPaths, GetStaticProps } from "next";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="container">
      <article>
        <h1>{post.title}</h1>
        <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In real app, fetch slugs from API/database
  const posts: Post[] = []; // This would come from your data source

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;

  try {
    // In real app, fetch post by slug from API/database
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
    const post: Post = await response.json();

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
      revalidate: 60, // ISR: Regenerate page every 60 seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
