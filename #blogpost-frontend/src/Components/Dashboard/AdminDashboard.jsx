import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed: npm install axios or yarn add axios

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingBlogId, setDeletingBlogId] = useState(null); // Changed from deletingAuthorId to deletingBlogId for clarity

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        
        const response = await axios.get('http://localhost:8080/getblogs');
        console.log("Response data:", response.data);
        
        
        const formattedBlogs = response.data.map(blog => ({
          id: blog.id,
          title: blog.title,
          content: blog.content, // Use 'content' from backend Blog model
          authorId: blog.author ? blog.author.id : null, // Access author's ID
          authorName: blog.author ? blog.author.name : 'Unknown', // Access author's name
          excerpt: blog.content ? blog.content.substring(0, 150) + '...' : ''
        }));
        setBlogs(formattedBlogs);

      } catch (err) {
        console.error("Failed to fetch blogs for admin dashboard:", err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(`Error fetching blogs: ${err.response.status} - ${err.response.statusText}. Ensure backend is running and /getblogs endpoint works.`);
          } else if (err.request) {
            setError("Error fetching blogs: No response from server. Check network.");
          } else {
            setError(`Error fetching blogs: ${err.message}`);
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

  // Function for deleting a blog via API call
  // This will send a DELETE request to your Spring Boot backend's blog delete endpoint.
  const handleDeleteBlog = async (blogId) => { // Changed function name to handleDeleteBlog
    setDeletingBlogId(blogId); // Indicate that a deletion is in progress for this blog

    try {
      // --- ACTUAL DELETE API CALL ---
      // IMPORTANT FIX: The URL must match your backend's @DeleteMapping("/getblog/{id}")
      await axios.delete(`http://localhost:8080/deleteblog/${blogId}`);

      // After successful deletion from the database, update the local state.
      // Filter out the deleted blog by its ID.
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));

      console.log(`Successfully deleted blog with ID: ${blogId}.`);
      // You can add a success notification here (e.g., using a toast library)
    } catch (err) {
      console.error(`Error deleting blog with ID ${blogId}:`, err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with an error (e.g., 404 if blog not found, 500 for server error)
          setError(`Failed to delete blog: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          // The request was made but no response was received (e.g., network down)
          setError("Failed to delete blog: No response from server. Please check your network.");
        } else {
          // Something else happened in setting up the request
          setError(`Failed to delete blog: ${err.message}`);
        }
      } else {
        setError(`An unexpected error occurred during deletion: ${err.message}`);
      }
      // You can add an error notification here
    } finally {
      setDeletingBlogId(null); // Reset deletion state regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-3xl p-8 sm:p-10 lg:p-12">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 sm:mb-10">
          Admin Dashboard
        </h1>

        {/* All Blogs Section with Delete Blog Option */}
        <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">All Available Blogs</h2>
          {loading && (
            <p className="text-gray-600 text-center">Loading blogs...</p>
          )}
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-4"> {/* Single column layout for blogs */}
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog.id} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm">{blog.excerpt}</p> {/* Displaying excerpt */}
                      {/* Displaying actual author name */}
                      <p className="text-gray-500 text-xs mt-1">Author: {blog.authorName} (ID: {blog.authorId})</p>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)} // Pass the blog's ID
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300
                                  ${deletingBlogId === blog.id // Use deletingBlogId for this button's state
                                    ? 'bg-red-400 text-white cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700'
                                  }`}
                      disabled={deletingBlogId !== null} // Disable all delete buttons if one is active
                    >
                      {deletingBlogId === blog.id ? 'Deleting...' : 'Delete Blog'}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No blogs available at the moment.</p>
              )}
            </div>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <Link
            to="/adminlogin"
            className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;