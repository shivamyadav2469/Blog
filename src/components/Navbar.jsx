import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-xl">Blog App</Link>
        <div>
          {!currentUser ? (
            <>
              <Link to="/new-blog" className="text-white mx-2">Add Blog</Link>
              <Link to="/login" className="text-white mx-2">Login</Link>
              <Link to="/signup" className="text-white mx-2">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/new-blog" className="text-white mx-2">Add Blog</Link>
              <button onClick={handleLogout} className="text-white mx-2">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
