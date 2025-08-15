import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type {
  Project,
  StrapiResponse,
  StrapiProject,
  StrapiPost,
} from "~/types";
import type { Post } from "~/types";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Project[];
  posts: Post[];
}> {
  const url = new URL(request.url);

  //Promise.all is used to fetch projects and posts in parallel (an array of responses)
  const [projectResponse, postResponse] = await Promise.all([
    fetch(
      //this is returned as an array called data
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
  ]);

  if (!projectResponse.ok || !postResponse.ok) {
    throw new Error("Failed to fetch projects or posts");
  }

  const projectJson: StrapiResponse<StrapiProject> =
    await projectResponse.json();
  const postJson: StrapiResponse<StrapiPost> = await postResponse.json();

  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  const posts = postJson.data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    date: item.date,
  }));

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  console.log(projects);
  // const now = new Date().toISOString();
  //this shows the seperation between server and client render
  // if (typeof window === "undefined") {
  //   console.log("Server Render at:", now);
  // } else {
  //   console.log("Client Hydration at:", now);
  // }
  // console.log("Home");
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
