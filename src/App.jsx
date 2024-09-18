import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import SingleBlog from './components/SingleBlog';
import BlogForm from './components/BlogForm';
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';

function App() {
  const currentUser = useSelector((state) => state.auth.user); // Get current user from Redux state

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect to signup page if user is not logged in */}
        {!currentUser ? (
          <>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/signup" />} /> {/* Redirect to signup by default */}
          </>
        ) : (
          <>
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/edit/:id" element={<BlogForm />} />
            <Route path="/new-blog" element={<BlogForm />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to homepage if logged in */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
