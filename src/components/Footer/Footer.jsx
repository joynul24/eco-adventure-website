import React from 'react';
import { LuLeaf, LuTwitter, LuFacebook, LuInstagram, LuYoutube } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
             <LuLeaf className="h-8 w-8 text-teal-600" />
             <span className="font-serif text-xl font-bold">EcoAdventure</span>
          </div>
          <p className="text-sm text-gray-400">
            Journey into the wild with sustainability at heart. We guide you to the most pristine environments while preserving nature.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600 transition-colors">Mountain Treks</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Ocean Dives</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Forest Expeditions</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Wildlife Safaris</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Sustainability Policy</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-teal-600 transition-colors">Careers</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://web.facebook.com/devjoynul" className="hover:text-teal-600 transition-colors"><LuFacebook size={24} /></a>
            <a href="#" className="hover:text-teal-600 transition-colors"><LuTwitter size={24} /></a>
            <a href="https://www.instagram.com/devjoynul/" className="hover:text-teal-600 transition-colors"><LuInstagram size={24} /></a>
            <a href="#" className="hover:text-teal-600 transition-colors"><LuYoutube size={24} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} EcoAdventure Experiences. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
