import React from 'react';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Dental Surgeon",
      content: "Excellent quality dental equipment. Fast delivery and great customer service.",
      rating: 5
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      content: "Reliable supplier with competitive prices. Highly recommended for dental professionals.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by dental professionals across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}