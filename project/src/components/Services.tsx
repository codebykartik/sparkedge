import React from 'react';
import { Zap, Home, Building, Shield, Wrench, Award } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Commercial Wiring',
      description: 'Complete electrical installations for office buildings, shops, and commercial spaces.',
      features: ['Power distribution', 'Lighting systems', 'Safety compliance']
    },
    {
      icon: Home,
      title: 'Residential Electrical',
      description: 'Home electrical work including wiring, panel upgrades, and fixture installations.',
      features: ['Panel upgrades', 'Outlet installation', 'Ceiling fans']
    },
    {
      icon: Shield,
      title: 'Safety Inspections',
      description: 'Comprehensive electrical safety audits and compliance certifications.',
      features: ['Code compliance', 'Safety testing', 'Certification']
    },
    {
      icon: Wrench,
      title: 'Maintenance & Repair',
      description: 'Emergency repairs, troubleshooting, and ongoing electrical maintenance.',
      features: ['24/7 emergency', 'Troubleshooting', 'Preventive care']
    },
    {
      icon: Zap,
      title: 'Smart Installations',
      description: 'Modern smart electrical systems and automation for buildings.',
      features: ['Smart lighting', 'Automation', 'Energy efficiency']
    },
    {
      icon: Award,
      title: 'Project Management',
      description: 'End-to-end electrical project management for large building contracts.',
      features: ['Planning', 'Coordination', 'Quality assurance']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive electrical contracting services for buildings across Delhi. 
            From small repairs to large-scale installations, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <service.icon className="h-12 w-12 text-blue-600 relative z-10 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;