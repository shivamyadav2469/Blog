import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlog } from '../features/blogSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill'; // Text editor
import 'react-quill/dist/quill.snow.css'; // Styling for the editor

const BlogForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingBlog = useSelector((state) =>
    state.blog.blogs.find((blog) => blog.id === id)
  );

  // Initialize state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id && existingBlog) {
      setTitle(existingBlog.title);
      setDescription(existingBlog.description);
      setCoverImage(existingBlog.coverImage);
    } else {
      // Clear image if not editing
      localStorage.removeItem('coverImage');
    }
  }, [id, existingBlog]);

  useEffect(() => {
    // Load coverImage from localStorage if no image is provided
    const savedCoverImage = localStorage.getItem('coverImage');
    if (!coverImage && savedCoverImage) {
      setCoverImage(savedCoverImage);
    }
  }, [coverImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          localStorage.setItem('coverImage', base64String);
          setCoverImage(base64String);
        };
        reader.readAsDataURL(file);
        setImageFile(file);
      } else {
        alert('Please upload a valid image file.');
        e.target.value = ''; // Clear the input
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { id: id ? id : uuidv4(), title, description, coverImage };
    if (id) {
      dispatch(updateBlog(newBlog));
    } else {
      dispatch(addBlog(newBlog));
    }
    navigate('/');
  };

  useEffect(() => {
    return () => {
      // Clear coverImage from localStorage if it's a URL (optional)
      if (coverImage && typeof coverImage === 'string' && !coverImage.startsWith('data:image')) {
        localStorage.removeItem('coverImage');
      }
    };
  }, [coverImage]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{id ? 'Edit Blog' : 'Add New Blog'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-gray-700">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="h-40"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="coverImage" className="font-medium text-gray-700 mt-8">Cover Image</label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          {coverImage && (
            <img src={coverImage} alt="Preview" className="mt-2 max-w-full h-auto" />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {id ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
