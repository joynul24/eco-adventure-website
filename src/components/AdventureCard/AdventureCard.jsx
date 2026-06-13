import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLeaf } from 'react-icons/lu';

const AdventureCard = ({ adventure }) => {
    const navigate = useNavigate();
    const { _id, id, adventureTitle, image, ecoFriendlyFeatures } = adventure;
    
    // Fallback if mongodb _id is not ready
    const uid = _id || id;

    return (
        <div className="card bg-white dark:bg-gray-800 shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-transparent dark:border-gray-700">
            <figure className="relative h-64 overflow-hidden">
                <img loading="lazy" src={image} referrerPolicy="no-referrer" alt={adventureTitle} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-teal-600 shadow-sm flex items-center gap-1">
                    <LuLeaf /> Eco Certified
                </div>
            </figure>
            <div className="card-body">
                <h3 className="card-title font-serif text-2xl mb-2 text-gray-900 dark:text-white">{adventureTitle}</h3>
                
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Eco Features:</p>
                    <ul className="flex flex-wrap gap-2">
                        {ecoFriendlyFeatures?.map((feature, idx) => (
                            <li key={idx} className="bg-green-50 dark:bg-green-900/20 text-slate-800 dark:text-green-400 text-xs px-2 py-1 rounded-md border border-teal-600/20">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card-actions justify-end mt-auto pt-4">
                    <button 
                        onClick={() => navigate(`/adventure/${uid}`)} 
                        className="btn bg-slate-700 text-white hover:bg-teal-600 border-none w-full"
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdventureCard;
