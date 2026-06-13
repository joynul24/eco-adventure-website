import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || location.state?.from || '/';
  
  const [errorInfo, setErrorInfo] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    
    setErrorInfo('');

    // Password validation logic
    if (password.length < 6) {
      setErrorInfo("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorInfo("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorInfo("Password must contain at least one lowercase letter");
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      toast.success('Registration successful!');
      navigate(from, { replace: true });
    } catch (err) {
      setErrorInfo(err.message);
      toast.error('Registration failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success('Google registration successful!');
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
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Join our community of eco-adventurers</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium dark:text-slate-300">Name</span>
                  </label>
                  <input type="text" name="name" placeholder="John Doe" className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium dark:text-slate-300">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="you@example.com" className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                </div>
             </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-slate-300">Photo URL</span>
              </label>
              <input type="url" name="photo" placeholder="https://example.com/photo.jpg" className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
            </div>

            <div className="form-control">
              <label className="label">
                 <span className="label-text font-medium dark:text-slate-300">Password</span>
              </label>
              <input type="password" name="password" placeholder="Min 6 chars, 1 uppercase, 1 lowercase" className="input input-bordered focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
            </div>

            {errorInfo && (
              <div className="p-3 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-lg mt-2">
                {errorInfo}
              </div>
            )}
            
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none w-full shadow-lg shadow-teal-600/30 mt-6">
              Create Account
            </button>
          </form>

          <div className="divider text-slate-400 my-8">or register with</div>
          
          <button onClick={handleGoogleLogin} className="btn bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white w-full flex items-center justify-center gap-3 shadow-sm transition-all duration-200">
             <FcGoogle size={22} className="shrink-0" />
             Google
          </button>

          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Already have an account? <Link to="/login" state={{ from: location.state?.from || '/' }} className="text-teal-600 font-bold hover:text-teal-500 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Visual Section - Hidden on mobile */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-start p-12 justify-end"
        style={{
          backgroundImage: "linear-gradient(to top, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=1200')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-white max-w-lg text-right mt-16">
          <h2 className="text-4xl font-serif font-bold mb-4">Discover Hidden Wonders</h2>
          <p className="text-slate-300 text-lg">Join thousands of conscious travelers exploring the globe sustainably. Your next great adventure begins here.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
