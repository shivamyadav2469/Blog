import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import SingleBlog from './components/SingleBlog';
import BlogForm from './components/BlogForm';
import SignupForm from './Auth/SignUpForm';
import LoginForm from './Auth/LoginForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/edit/:id" element={<BlogForm />} /> 
        <Route path="/Signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/new-blog" element={<BlogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
