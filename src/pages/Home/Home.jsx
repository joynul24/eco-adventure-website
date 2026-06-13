import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AdventureCard from '../../components/AdventureCard/AdventureCard';

const CustomNavButtons = () => {
    const swiper = useSwiper();
    return (
        <div className="absolute bottom-10 right-10 z-20 hidden md:flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <button onClick={() => swiper.slidePrev()} className="h-14 w-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-teal-600 hover:border-teal-600 transition-all backdrop-blur-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button onClick={() => swiper.slideNext()} className="h-14 w-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-teal-600 hover:border-teal-600 transition-all backdrop-blur-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
        </div>
    );
};

const Home = () => {
    // Fetch experiences via React Query and Axios from our server (or fallback static data)
    const { data: adventures = [], isLoading } = useQuery({
        queryKey: ['adventures'],
        queryFn: async () => {
            const res = await axios.get('/adventures.json');
            return res.data;
        }
    });

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1421&ixlib=rb-4.0.3",
            title: "Discover the Wild",
            description: "Embark on eco-friendly journeys that leave a positive impact."
        },
        {
            image: "https://images.unsplash.com/photo-1504280741562-fd080b5115ff?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
            title: "Mountain Treks & Forest Expeditions",
            description: "Explore the most breathtaking landscapes nature has designed."
        },
        {
            image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
            title: "Ocean Dives & Reef Protection",
            description: "Immerse yourself in marine biology and coral conservation."
        }
    ];

    return (
        <div className="space-y-16">
            {/* Banner Section */}
            <section className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8 relative h-[calc(100vh-64px)] min-h-[600px] overflow-hidden group">
                <Swiper
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="h-full w-full"
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            {({ isActive }) => (
                                <div className="h-full w-full relative overflow-hidden">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
                                        style={{ 
                                            backgroundImage: `url(${slide.image})`,
                                            transform: isActive ? 'scale(1.1)' : 'scale(1)' 
                                        }}
                                    />
                                    {/* Elegant gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent"></div>
                                    
                                    <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 max-w-5xl">
                                        <motion.div
                                            initial={false}
                                            animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                        >
                                            <span className="inline-block py-1.5 px-4 rounded-full bg-teal-500/20 text-teal-300 font-semibold tracking-widest text-xs uppercase mb-6 backdrop-blur-md border border-teal-500/30">
                                                Eco-Tourism Experience
                                            </span>
                                            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-tight">
                                                {slide.title}
                                            </h1>
                                            <p className="text-slate-300 text-lg md:text-2xl font-light mb-10 max-w-2xl drop-shadow-md">
                                                {slide.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4">
                                                <button className="btn bg-teal-600 hover:bg-teal-500 text-white border-none px-8 rounded-full shadow-lg shadow-teal-600/30 font-semibold tracking-wide h-14">
                                                    Start Exploration
                                                </button>
                                                <button className="btn btn-outline border-white/60 text-white hover:bg-white hover:text-slate-900 px-8 rounded-full font-semibold tracking-wide h-14 backdrop-blur-sm">
                                                    View Itineraries
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                    
                    {/* Custom Navigation */}
                    <CustomNavButtons />
                </Swiper>
            </section>

            {/* Adventure Experiences Section */}
            <section className="py-8" data-aos="fade-up">
                <div className="text-center mb-12">
                   <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Eco-Adventures</h2>
                   <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Browse our curated selection of environmentally conscious expeditions. Each journey is designed to connect you deeply with our planet.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center h-40 items-center">
                        <span className="loading loading-spinner text-teal-600 loading-lg"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {adventures.map(adv => <AdventureCard key={adv._id || adv.id} adventure={adv} />)}
                    </div>
                )}
            </section>

            {/* Extra Section 1: Why Choose Us */}
            <section className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mx-auto" data-aos="fade-up">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                     <div>
                         <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Why Journey With Us?</h2>
                         <ul className="space-y-4">
                             <li className="flex gap-4">
                                 <div className="h-10 w-10 flex-shrink-0 bg-teal-600/20 text-slate-800 dark:text-teal-600 rounded-full flex items-center justify-center font-bold">1</div>
                                 <div>
                                     <h3 className="font-bold text-gray-900 dark:text-white">100% Carbon Neutral</h3>
                                     <p className="text-sm text-gray-500 dark:text-gray-400">All our expeditions offset carbon emissions through certified global planting programs.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4">
                                 <div className="h-10 w-10 flex-shrink-0 bg-teal-600/20 text-slate-800 dark:text-teal-600 rounded-full flex items-center justify-center font-bold">2</div>
                                 <div>
                                     <h3 className="font-bold text-gray-900 dark:text-white">Expert Naturalist Guides</h3>
                                     <p className="text-sm text-gray-500 dark:text-gray-400">Learn from local biologists and forest rangers who deeply understand the ecosystem.</p>
                                 </div>
                             </li>
                             <li className="flex gap-4">
                                 <div className="h-10 w-10 flex-shrink-0 bg-teal-600/20 text-slate-800 dark:text-teal-600 rounded-full flex items-center justify-center font-bold">3</div>
                                 <div>
                                     <h3 className="font-bold text-gray-900 dark:text-white">Community Driven</h3>
                                     <p className="text-sm text-gray-500 dark:text-gray-400">A major portion of every booking directly supports indigenous communities.</p>
                                 </div>
                             </li>
                         </ul>
                     </div>
                     <div className="relative">
                         <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3" alt="Nature" className="rounded-2xl shadow-lg w-full object-cover h-96" />
                     </div>
                 </div>
            </section>

            {/* Extra Section 2: Newsletter */}
            <section className="bg-slate-800 text-white py-16 px-6 -mx-4 sm:-mx-6 lg:-mx-8 text-center" data-aos="fade-up">
                 <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-4xl font-serif font-bold">Join the Eco-Movement</h2>
                    <p className="text-gray-300">Subscribe. Get early access to limited expeditions and conservation news.</p>
                    <div className="flex bg-white rounded-full p-2 max-w-md mx-auto shadow-xl focus-within:ring-4 focus-within:ring-teal-600/50">
                        <input type="email" placeholder="Your email address" className="flex-1 bg-transparent px-4 text-gray-900 outline-none" />
                        <button className="bg-teal-600 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors">Subscribe</button>
                    </div>
                 </div>
            </section>
        </div>
    );
};

export default Home;
