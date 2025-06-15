import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [availableBlogs, setAvailableBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getblogs");
        const data = response.data;

        const formattedBlogs = data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          authorName: blog.author ? blog.author.name : "Unknown Author",
          excerpt: blog.content ? blog.content.substring(0, 100) + "..." : "",
          fullContent: blog.content,
        }));

        setAvailableBlogs(formattedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(
              `Failed to load blogs: ${err.response.status} - ${err.response.statusText}. Ensure backend is running.`
            );
          } else if (err.request) {
            setError(
              "Failed to load blogs: No response from server. Please check your network."
            );
          } else {
            setError(`Failed to load blogs: ${err.message}`);
          }
        } else {
          setError(`An unexpected error occurred: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const toggleBlogExpansion = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id); // Toggle based on current expanded state
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-8 sm:mb-10">
          Welcome to Blogzz..!
        </h1>

        <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner mb-8 w-full">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Available Blogs
          </h2>
          {loading && (
            <p className="text-gray-600 text-center">Loading blogs...</p>
          )}
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}
          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {availableBlogs.length > 0 ? (
                availableBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200"
                  >
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                      {blog.title}
                    </h3>

                    {expandedBlogId === blog.id ? (
                      <p className="text-gray-600 text-base">
                        {blog.fullContent}
                      </p>
                    ) : (
                      <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                    )}

                    <button
                      onClick={() => toggleBlogExpansion(blog.id)}
                      className="mt-3 inline-block text-indigo-600 hover:underline text-sm font-medium focus:outline-none"
                    >
                      {expandedBlogId === blog.id ? "Read Less" : "Read More"}{" "}
                      &rarr;
                    </button>

                    <span className="text-violet-900 font-bold ml-48 mt-4 ">
                      {" "}
                      Author : {blog.authorName}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No blogs available at the moment.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/login"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
