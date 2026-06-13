import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LuClock, LuMapPin, LuDollarSign, LuActivity, LuUsers, LuMessageCircle } from 'react-icons/lu';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

import Swal from 'sweetalert2';

const AdventureDetails = () => {
    const { id } = useParams();

    const { data: adventure, isLoading, error } = useQuery({
        queryKey: ['adventure', id],
        queryFn: async () => {
            const res = await axios.get('/adventures.json');
            return res.data.find(a => (a._id === id || a.id === id || a.id?.toString() === id));
        }
    });

    const handleExpertConsultation = () => {
        const currentHour = new Date().getHours();
        // Between 10:00 AM (10) and 8:00 PM (20)
        if (currentHour >= 10 && currentHour < 20) {
            window.open('https://meet.google.com/new', '_blank');
        } else {
            Swal.fire({
                title: 'Expert Offline',
                text: 'Our experts are currently resting. Consultation hours are from 10:00 AM to 8:00 PM.',
                icon: 'info',
                confirmButtonColor: '#1e392a',
                confirmButtonText: 'Got it, thanks!'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner text-teal-600 loading-lg"></span>
            </div>
        );
    }

    if (error || !adventure) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl text-red-500">Adventure not found</h2>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
            <div className="relative h-[400px]">
                <img src={adventure.image} referrerPolicy="no-referrer" alt={adventure.adventureTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <span className="badge bg-teal-600 border-none text-white font-bold mb-3 py-3 px-4">{adventure.categoryName}</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{adventure.adventureTitle}</h1>
                </div>
            </div>

            <div className="p-8 md:p-12 text-gray-800 dark:text-gray-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
                            <p className="text-lg leading-relaxed">{adventure.shortDescription}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <LuClock className="text-teal-600 text-2xl" />
                                <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Duration</span>
                                <span className="font-bold dark:text-white">{adventure.duration}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <LuActivity className="text-teal-600 text-2xl" />
                                <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Level</span>
                                <span className="font-bold dark:text-white">{adventure.adventureLevel}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <LuUsers className="text-teal-600 text-2xl" />
                                <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Group Size</span>
                                <span className="font-bold dark:text-white">Max {adventure.maxGroupSize}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <LuMapPin className="text-teal-600 text-2xl" />
                                <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Location</span>
                                <span className="font-bold dark:text-white">{adventure.location}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Eco-Friendly Initiatives</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {adventure.ecoFriendlyFeatures.map((feature, i) => (
                                    <li key={i} className="flex gap-3 items-center">
                                        <FiCheckCircle className="text-teal-600 flex-shrink-0" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Included Items</h3>
                            <div className="flex flex-wrap gap-2">
                                {adventure.includedItems.map((item, i) => (
                                    <span key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-semibold">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-700/50">
                            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-4 flex items-center gap-2">
                                <FiAlertTriangle /> Special Instructions
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-yellow-700 dark:text-yellow-300">
                                {adventure.specialInstructions.map((instruction, i) => (
                                    <li key={i}>{instruction}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-2xl sticky top-24">
                            <h3 className="text-xl font-bold dark:text-white mb-6">Booking Details</h3>
                            <div className="flex items-center gap-2 text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                                <LuDollarSign className="text-teal-600" />
                                {adventure.adventureCost}
                            </div>
                            <div className="mb-8">
                                {adventure.bookingAvailability ? (
                                    <span className="badge badge-success gap-2 p-3 font-bold text-white"><FiCheckCircle /> Available</span>
                                ) : (
                                    <span className="badge badge-error gap-2 p-3 font-bold text-white"><FiAlertTriangle /> Fully Booked</span>
                                )}
                            </div>
                            
                            <button 
                                onClick={handleExpertConsultation}
                                className="btn w-full bg-slate-800 hover:bg-teal-600 text-white border-none flex items-center gap-2"
                            >
                                <LuMessageCircle size={20} /> Talk with Expert
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">Experts online: 10:00 AM - 8:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default AdventureDetails;
