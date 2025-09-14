import React from 'react';
import { Star, Quote, User } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      company: 'Kumar Construction',
      rating: 5,
      review: 'Excellent work on our residential project. Professional team, on-time delivery, and quality installation. Highly recommend Spark Edge Electrical for any electrical work.',
      project: 'Residential Complex Wiring',
      image: 'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      company: 'Sharma Builders',
      rating: 5,
      review: 'Outstanding service! They completed our office building electrical work ahead of schedule. The team was professional, knowledgeable, and maintained high safety standards throughout.',
      project: 'Office Building Installation',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Amit Gupta',
      company: 'Metro Mall Developers',
      rating: 5,
      review: 'Spark Edge Electrical handled our shopping mall project with great expertise. Their attention to detail and commitment to quality made all the difference.',
      project: 'Shopping Mall Electrical Setup',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Sunita Verma',
      company: 'Verma Industries',
      rating: 5,
      review: 'Professional team with deep technical knowledge. They solved complex electrical challenges in our industrial facility efficiently and safely.',
      project: 'Industrial Electrical Upgrade',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients across Delhi say about our electrical contracting services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: '100+', label: 'Projects Completed' },
            { number: '5★', label: 'Average Rating' },
            { number: '50+', label: 'Happy Clients' },
            { number: '3+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-12 w-12 text-blue-600" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                "{review.review}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-blue-600 font-medium">{review.company}</div>
                  <div className="text-gray-500 text-sm">{review.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Satisfied Clients
            </h3>
            <p className="text-gray-600 mb-6">
              Ready to experience professional electrical contracting services?
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Your Quote Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;