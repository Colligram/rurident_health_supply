import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Sarah Kimani',
    role: 'Dental Surgeon, Nairobi Hospital',
    content: 'Rurident has been our trusted supplier for over 5 years. Their quality products and reliable service have helped us maintain the highest standards in our practice.',
    rating: 5,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Dr. Michael Ochieng',
    role: 'Private Practice, Kisumu',
    content: 'The dental chair I purchased from Rurident has exceeded my expectations. Excellent build quality and the after-sales support is outstanding.',
    rating: 5,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'Grace Wanjiku',
    role: 'BDS Student, University of Nairobi',
    content: 'The student kit from Rurident had everything I needed for my clinical rotations. Great value for money and fast delivery to campus.',
    rating: 5,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by dental professionals across Kenya for quality products and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}