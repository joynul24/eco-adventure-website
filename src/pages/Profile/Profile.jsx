import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { motion } from 'framer-motion';
import { LuMail, LuUser } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto py-12"
        >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="h-40 bg-slate-800 relative">
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring-4 ring-white dark:ring-gray-800 bg-white">
                                <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} referrerPolicy="no-referrer" alt="Profile" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-20 pb-12 px-8 text-center">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.displayName || "Explorer"}!</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">This is your personal eco-adventure passport. Keep your details updated for a smoother journey.</p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-left max-w-md mx-auto mb-8 space-y-4 shadow-sm border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-teal-600">
                                <LuUser size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Full Name</p>
                                <p className="font-bold dark:text-white text-lg">{user?.displayName || "Not set"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm text-teal-600">
                                <LuMail size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Email Address</p>
                                <p className="font-bold dark:text-white text-lg">{user?.email || "Not set"}</p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/update-profile')}
                        className="btn bg-teal-600 hover:bg-green-600 border-none text-white px-8 flex items-center gap-2 mx-auto shadow-lg shadow-green-500/30"
                    >
                        <FiEdit size={20} /> Update Profile
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
