// components/Navbar.js
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-xl">Blog App</Link>
        <div>
         <Link to="/new-blog" className="text-white mx-2">Add Blog</Link>
          <Link to="/login" className="text-white mx-2">Login</Link>
          <Link to="/signup" className="text-white mx-2">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
