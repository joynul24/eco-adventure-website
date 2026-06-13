import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer/Footer';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Eco-Adventure Experiences';
    switch (location.pathname) {
      case '/':
        title = 'Home | Eco-Adventure';
        break;
      case '/login':
        title = 'Login | Eco-Adventure';
        break;
      case '/register':
        title = 'Register | Eco-Adventure';
        break;
      case '/profile':
        title = 'My Profile | Eco-Adventure';
        break;
      case '/update-profile':
        title = 'Update Profile | Eco-Adventure';
        break;
      default:
        if (location.pathname.startsWith('/adventure/')) {
          title = 'Adventure Details | Eco-Adventure';
        }
        break;
    }
    document.title = title;
  }, [location.pathname]);

  return null;
};

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <DynamicTitle />
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
