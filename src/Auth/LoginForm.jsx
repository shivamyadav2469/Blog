import React, { useState } from 'react';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/authSlice'; 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState(''); 
  const [inputError, setInputError] = useState({}); 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setInputError({ ...inputError, [name]: false }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(loginSuccess({ user })); 
      console.log("Login successful");
      navigate('/'); 
    } catch (err) {
      console.error("Error logging in:", err.message);
      
      if (err.code === 'auth/wrong-password') {
        setError('The password you entered is incorrect.');
        setInputError({ ...inputError, password: true });
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
        setInputError({ ...inputError, email: true });
      } else {
        setError('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border ${
                inputError.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter your email"
              required
            />
            {inputError.email && (
              <p className="text-red-500 text-sm mt-1">Please check your email address.</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border ${
                inputError.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter your password"
              required
            />
            {inputError.password && (
              <p className="text-red-500 text-sm mt-1">Please check your password.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none"
          >
            Login
          </button>

          <div className="text-sm text-center">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
