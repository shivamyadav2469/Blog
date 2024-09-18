import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import SingleBlog from './components/SingleBlog';
import BlogForm from './components/BlogForm';
import SignupForm from './Auth/SignUpForm';
import LoginForm from './Auth/LoginForm';


function App() {
  const currentUser = useSelector((state) => state.auth.user); 

  return (
    <Router>
      <Navbar />
      <Routes>
        {!currentUser ? (
          <>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<Navigate to="/signup" />} /> 
          </>
        ) : (
          <>
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/edit/:id" element={<BlogForm />} />
            <Route path="/new-blog" element={<BlogForm />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
