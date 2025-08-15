import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 min-h-[70vh]">
      <h1 className="text-6xl font-extrabold text-blue-400 mb-2 text-center">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
      >
        Go back to the home page.
      </Link>
    </div>
  );
};

export default NotFoundPage;
