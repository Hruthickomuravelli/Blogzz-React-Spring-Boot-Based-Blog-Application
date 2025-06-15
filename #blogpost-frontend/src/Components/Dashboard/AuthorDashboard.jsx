import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthorDashboard = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Retrieve logged-in author's ID and Name from localStorage
  const loggedInAuthorId = localStorage.getItem("loggedInAuthorId");
  const loggedInAuthorName = localStorage.getItem("loggedInAuthorName");

  const [myBlogs, setMyBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [postingBlog, setPostingBlog] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  // Effect to verify login status and fetch blogs
  useEffect(() => {
    // Redirect to login if no author is logged in
    if (!loggedInAuthorId) {
      console.log("No author ID found in localStorage. Redirecting to login.");
      navigate("/authorlogin"); // Redirect to author login page
      return; // Stop further execution of this effect
    }

    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/blog/author/${loggedInAuthorId}`
        );
        const data = response.data;

        const formattedBlogs = data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          excerpt: blog.content ? blog.content.substring(0, 150) + "..." : "",
        }));

        setMyBlogs(formattedBlogs);
      } catch (err) {
        console.error(
          `Failed to fetch blogs for author ${loggedInAuthorId}:`,
          err
        );
        if (axios.isAxiosError(err)) {
          setErrorBlogs(
            `Error fetching your blogs: ${
              err.response?.statusText || err.message
            }. Ensure backend is running and '/author/{authorId}' endpoint works.`
          );
        } else {
          setErrorBlogs(`An unexpected error occurred: ${err.message}`);
        }
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchMyBlogs();
  }, [loggedInAuthorId, navigate]); // Depend on loggedInAuthorId and navigate

  // Function to handle posting a new blog
  const handlePostBlog = async (e) => {
    e.preventDefault();
    setPostingBlog(true);
    setPostError(null);
    setPostSuccess(false);

    if (!newBlogTitle.trim() || !newBlogContent.trim()) {
      setPostError("Title and content cannot be empty.");
      setPostingBlog(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/postblog", {
        title: newBlogTitle,
        content: newBlogContent, // <--- CORRECTED: Changed 'body' to 'content'
        author: { id: loggedInAuthorId }, // Use the dynamically retrieved loggedInAuthorId
      });

      const newBlog = response.data;

      setMyBlogs((prevBlogs) => [
        {
          ...newBlog,
          excerpt: newBlog.content
            ? newBlog.content.substring(0, 150) + "..."
            : "",
        },
        ...prevBlogs,
      ]);

      setNewBlogTitle("");
      setNewBlogContent("");
      setPostSuccess(true);
      console.log("Blog posted successfully:", newBlog);
    } catch (err) {
      console.error("Failed to post blog:", err);
      if (axios.isAxiosError(err)) {
        setPostError(
          `Failed to post blog: ${
            err.response?.statusText || err.message
          }. Ensure backend is running, '/postblog' endpoint works, and author ID ${loggedInAuthorId} exists.`
        );
      } else {
        setPostError(`An unexpected error occurred: ${err.message}`);
      }
    } finally {
      setPostingBlog(false);
    }
  };

  // Function to handle author logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInAuthorId");
    localStorage.removeItem("loggedInAuthorName");
    toast.success("Goodbye! You are logging out...!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
    setTimeout(() => {
      navigate("/authorlogin");
    }, 2000);
    // Redirect to login page after logout
  };

  
  if (!loggedInAuthorId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white shadow-xl rounded-3xl p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8 sm:mb-10">
            Welcome {loggedInAuthorName || "Logged-in Author"}
          </h1>

          {/* Post New Blog Section */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-inner mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Post a New Blog
            </h2>
            <form onSubmit={handlePostBlog} className="space-y-4">
              <div>
                <label
                  htmlFor="blogTitle"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="blogTitle"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={postingBlog}
                />
              </div>
              <div>
                <label
                  htmlFor="blogContent"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Blog Content
                </label>
                <textarea
                  id="blogContent"
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  placeholder="Write your blog content here..."
                  rows="8"
                  className="w-full px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
                  disabled={postingBlog}
                ></textarea>
              </div>
              {postError && <p className="text-red-600 text-sm">{postError}</p>}
              {postSuccess && (
                <p className="text-green-600 text-sm">
                  Blog posted successfully!
                </p>
              )}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-colors duration-300
                          ${
                            postingBlog
                              ? "bg-green-400 text-white cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                disabled={postingBlog}
              >
                {postingBlog ? "Posting..." : "Post Blog"}
              </button>
            </form>
          </div>

          {/* Your Posted Blogs Section */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Your Posted Blogs (Author ID: {loggedInAuthorId})
            </h2>
            {loadingBlogs && (
              <p className="text-gray-600 text-center">Loading your blogs...</p>
            )}
            {errorBlogs && (
              <p className="text-red-600 text-center font-semibold">
                {errorBlogs}
              </p>
            )}
            {!loadingBlogs && !errorBlogs && (
              <div className="grid grid-cols-1 gap-4">
                {myBlogs.length > 0 ? (
                  myBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-blue-200"
                    >
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{blog.excerpt} </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    You haven't posted any blogs yet.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Logout */}
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorDashboard;
