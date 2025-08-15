import { useState } from "react";
import type { Route } from "./+types/index";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Blog" },
    { name: "description", content: "My blog" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!response.ok) throw new Error("Failed to fetch data");

  const json: StrapiResponse<StrapiPost> = await response.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts = loaderData.posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const { posts } = loaderData;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // console.log(posts);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        📝 Blog
      </h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query: string) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogPage;
