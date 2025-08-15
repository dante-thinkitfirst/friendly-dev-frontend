import { section } from "framer-motion/client";
import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900 ">
      <img
        src="/images/profile.jpg"
        alt="Dante"
        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
      />
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">👋🏽 About Me</h2>
        <p className="text-gray-200 mb-4 max-w-4xl">
          I'm a software engineer with a passion for building web
        </p>
        <Link
          to="/about"
          className="inline-block text-blue-400 hover:underline text-sm"
        >
          Learn More about me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
