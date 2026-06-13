import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg bg-white p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
           <img src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-3702359-3119148.png" className="w-64" alt="404" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Lost in the Wild</h2>
        <p className="text-gray-500 mb-8">
          The adventure you are looking for doesn't exist or has been moved. 
          {error?.statusText || error?.message ? <span className="block mt-2 font-mono text-sm text-red-400">{error?.statusText || error?.message}</span> : null}
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="btn bg-slate-800 hover:bg-teal-600 text-white border-none w-full shadow-lg"
        >
          Return to Base Camp
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
