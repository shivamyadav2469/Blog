// features/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadBlogsFromLocalStorage = () => {
  try {
    const serializedBlogs = localStorage.getItem('blogs');
    if (serializedBlogs) {
      return JSON.parse(serializedBlogs);
    }
  } catch (e) {
    console.error("Failed to load blogs from localStorage:", e);
  }
  return [];
};

const saveBlogsToLocalStorage = (blogs) => {
  try {
    const serializedBlogs = JSON.stringify(blogs);
    localStorage.setItem('blogs', serializedBlogs);
  } catch (e) {
    console.error("Failed to save blogs to localStorage:", e);
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: loadBlogsFromLocalStorage(),
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
      saveBlogsToLocalStorage(state.blogs);
    },
    updateBlog: (state, action) => {
      const { id, title, description, coverImage } = action.payload;
      const existingBlog = state.blogs.find((blog) => blog.id === id);
      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.description = description;
        existingBlog.coverImage = coverImage;
        saveBlogsToLocalStorage(state.blogs);
      }
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      saveBlogsToLocalStorage(state.blogs);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
