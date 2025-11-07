import React from 'react';
import { Zap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full scale-100 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">SparkEdge Electrical</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Professional electrical contracting services for buildings across Delhi and NCR. 
              Powering your projects with excellence, safety, and reliability since 2022.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <nav className="space-y-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Services', id: 'services' },
                { name: 'Projects', id: 'projects' },
                { name: 'Reviews', id: 'reviews' },
                { name: 'Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <a href="tel:8130476851" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  8130476851
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <a href="mailto:info@sparkedgeelectrical.com" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  info@sparkedgeelectrical.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">Delhi, India</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-400 mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Business Hours</span>
              </h5>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Mon - Sat: 8:00 AM - 8:00 PM</div>
                <div>Sunday: 10:00 AM - 6:00 PM</div>
                <div className="text-yellow-400">Emergency: 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Spark Edge Electrical. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Licensed Contractor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
