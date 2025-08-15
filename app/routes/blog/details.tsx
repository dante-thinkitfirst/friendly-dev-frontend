import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`
  );

  if (!response.ok) throw new Error("Failed to fetch data");

  const json: StrapiResponse<StrapiPost> = await response.json();

  if (!json.data.length) throw new Response("Post not found", { status: 404 });

  const item = json.data[0];

  const post = {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  return { post };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post } = loaderData;
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <Link
        to="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Blog
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
