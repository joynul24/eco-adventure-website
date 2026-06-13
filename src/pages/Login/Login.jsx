import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailStr = form.email.value;
    const password = form.password.value;
    setErrorInfo('');

    try {
      await loginUser(emailStr, password);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch (err) {
      setErrorInfo(err.message);
      toast.error('Failed to log in. Please check credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success('Google Login Successful!');
      navigate(from, { replace: true });
    } catch (err) {
       toast.error(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[80vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800"
    >
      {/* Visual Section - Hidden on mobile */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-end p-12"
        style={{
          backgroundImage: "linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2)), url('https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=1200')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-serif font-bold mb-4">Welcome Back to the Wild</h2>
          <p className="text-slate-300 text-lg">Sign in to resume your eco-adventures, track your sustainable journeys, and plan your next destination.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">Sign In</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Access your eco-adventure passport</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-slate-300">Email Address</span>
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
                required 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-control">
              <div className="flex justify-between items-center">
                <label className="label">
                   <span className="label-text font-medium dark:text-slate-300">Password</span>
                </label>
                <Link to="/forget-password" state={{ email }} className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
                required 
              />
            </div>
            
            {errorInfo && (
              <div className="p-3 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-lg">
                {errorInfo}
              </div>
            )}
            
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none w-full shadow-lg shadow-teal-600/30 mt-2">
              Sign In
            </button>
          </form>

          <div className="divider text-slate-400 my-8">or continue with</div>
          
          <button onClick={handleGoogleLogin} className="btn bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white w-full flex items-center justify-center gap-3 shadow-sm transition-all duration-200">
             <FcGoogle size={22} className="shrink-0" />
             Google
          </button>

          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Don't have an account yet? <Link to="/register" state={{ from: location.state?.from || '/' }} className="text-teal-600 font-bold hover:text-teal-500 transition-colors">Register here</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
