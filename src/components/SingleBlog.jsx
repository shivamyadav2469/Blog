// components/SingleBlog.js
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleBlog = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blogs.find((b) => b.id === id));

  if (!blog) return <div className="container mx-auto p-4">Blog not found</div>;

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
