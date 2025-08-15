import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | About" },
    { name: "description", content: "About me" },
  ];
}

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          src="/images/profile.jpg"
          alt="Dante"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">Hey, I'm Dante 👋🏽</h1>
          <p className="text-gray-300 text-lg">
            I'm a software engineer with a passion for building web
            applications.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">My MIssion</h2>
        <p className="text-gray-300 leading-relaxed">
          I'm a software engineer with a passion for building web
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className="text-2xl font-semibold text-white mb-4">🚀 Tech I use</h2>
      <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
        {[
          "React",
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "Node.js",
          "Express",
          "MongoDB",
        ].map((tech) => (
          <li key={tech} className="bg-gray-700 px-3 py-1 rounded-md">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
