import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;

        setLoading(true);
        try {
            await updateUserProfile({ displayName: name, photoURL });
            toast.success("Profile updated successfully!");
            navigate('/profile');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto py-12"
        >
            <div className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="card-body p-8">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2 text-center">Update Profile</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Change your public display name and avatar.</p>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-gray-300 font-semibold">Name</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                defaultValue={user?.displayName || ''} 
                                placeholder="Your full name"
                                className="input input-bordered focus:border-teal-600 focus:ring-1 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                                required 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-gray-300 font-semibold">Photo URL</span>
                            </label>
                            <input 
                                type="url" 
                                name="photoURL" 
                                defaultValue={user?.photoURL || ''} 
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered focus:border-teal-600 focus:ring-1 focus:ring-teal-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                                required 
                            />
                        </div>

                        <div className="form-control pt-4">
                            <button 
                                type="submit" 
                                className="btn bg-slate-800 hover:bg-teal-600 text-white border-none"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default UpdateProfile;
