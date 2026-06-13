import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleReset = (e) => {
        e.preventDefault();
        window.open(`https://mail.google.com/mail/u/0/?fs=1&to=admin@eco-adventure.com&su=Password+Reset+Request+for+${email}&tf=cm`, '_blank');
        navigate('/login');
    };

    return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[60vh] flex items-center justify-center"
        >
            <div className="card w-full max-w-md shadow-xl bg-white dark:bg-gray-900 border dark:border-gray-800">
                <div className="card-body">
                   <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 text-center">Reset Password</h2>
                   <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">Enter your email and click reset, you will be redirected to Gmail to compose a request.</p>
                   
                   <form onSubmit={handleReset}>
                       <div className="form-control mb-6">
                            <label className="label">
                               <span className="label-text dark:text-gray-300">Email Address</span>
                            </label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="email@example.com" 
                                className="input input-bordered focus:border-teal-600 focus:ring-1 focus:ring-teal-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
                                required 
                            />
                       </div>
                       <button className="btn bg-teal-600 border-none text-white w-full hover:bg-green-600">Reset Password</button>
                   </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ForgetPassword;
