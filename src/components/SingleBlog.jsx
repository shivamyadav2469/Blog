import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const SingleBlog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const blog = useSelector((state) => state.blog.blogs.find((b) => b.id === id));

  useEffect(() => {
    if (blog) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-800 border-opacity-50 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="container mx-auto p-4">Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      {blog.coverImage && (
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-auto mb-6 rounded-lg object-cover shadow-md" 
        />
      )}
      <div 
        className="prose lg:prose-xl" 
        dangerouslySetInnerHTML={{ __html: blog.description }} 
      />
    </div>
  );
};

export default SingleBlog;
