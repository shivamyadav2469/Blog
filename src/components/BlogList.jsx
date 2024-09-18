import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBlog } from '../features/blogSlice';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import Carousel from './Carousel';

const BlogList = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    dispatch(deleteBlog(deleteConfirm));
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-8">
      <Carousel />
      {blogs.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md mt-6">
          <p className="text-gray-500 text-xl">No blogs here</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {currentBlogs.map((blog) => {
              const sanitizedDescription = DOMPurify.sanitize(blog.description);

              return (
                <div key={blog.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  {blog.coverImage && (
                    <div className="relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-48 w-full rounded-t-md object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                    <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline">Read More</Link>

                    {/* Edit/Delete only if the user is the owner */}
                    {currentUser?.id === blog.userId && (
                      <div className="mt-4 flex justify-between items-center">
                        <Link to={`/edit/${blog.id}`} className="text-blue-500 border rounded-md px-6 py-2 hover:bg-slate-200">Edit</Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-500 border rounded-md px-6 py-2 hover:bg-slate-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this blog post?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 "
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
