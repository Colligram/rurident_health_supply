import React, { useState } from 'react';

// Type definitions
interface Reply {
  id: number;
  name: string;
  content: string;
  date: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  approved: boolean;
  replies: Reply[];
}

// Mock admin check (replace with real auth in production)
const isAdmin = true; // Set to false to test as normal user

export function TestimonialsSection() {
  // Mock testimonials state (replace with API/database in production)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Dental Surgeon",
      content: "Excellent quality dental equipment. Fast delivery and great customer service.",
      rating: 5,
      date: "2024-05-01",
      approved: true,
      replies: [
        { id: 1, name: "Admin", content: "Thank you for your feedback!", date: "2024-05-02" }
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      content: "Reliable supplier with competitive prices. Highly recommended for dental professionals.",
      rating: 5,
      date: "2024-05-03",
      approved: true,
      replies: []
    }
  ]);
  const [newReview, setNewReview] = useState({ name: '', role: '', content: '', rating: 5, date: '', });
  const [replyContent, setReplyContent] = useState<Record<number, string>>({});

  // Add new review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content || !newReview.date) return;
    setTestimonials([
      ...testimonials,
      {
        id: Date.now(),
        ...newReview,
        approved: false, // Needs admin approval
        replies: []
      }
    ]);
    setNewReview({ name: '', role: '', content: '', rating: 5, date: '' });
  };

  // Admin: Approve review
  const handleApprove = (id: number) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, approved: true } : t));
  };
  // Admin: Delete review
  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };
  // Admin/anyone: Reply to review
  const handleReply = (id: number) => {
    if (!replyContent[id]) return;
    setTestimonials(testimonials.map(t =>
      t.id === id
        ? { ...t, replies: [...t.replies, { id: Date.now(), name: isAdmin ? 'Admin' : 'User', content: replyContent[id], date: new Date().toISOString().slice(0, 10) }] }
        : t
    ));
    setReplyContent({ ...replyContent, [id]: '' });
  };

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

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
          <div className="mb-3">
            <input type="text" className="input-field" placeholder="Your Name" value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <input type="text" className="input-field" placeholder="Your Role (optional)" value={newReview.role} onChange={e => setNewReview({ ...newReview, role: e.target.value })} />
          </div>
          <div className="mb-3">
            <textarea className="input-field" placeholder="Your Review" value={newReview.content} onChange={e => setNewReview({ ...newReview, content: e.target.value })} required />
          </div>
          <div className="mb-3 flex items-center gap-2">
            <label className="mr-2">Rating:</label>
            <select value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })} className="input-field w-24">
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="mr-2">Service Delivery Date:</label>
            <input type="date" className="input-field" value={newReview.date} onChange={e => setNewReview({ ...newReview, date: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary">Submit Review</button>
        </form>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.filter(t => t.approved).map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div className="mb-2">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                {testimonial.role && <p className="text-sm text-gray-600">{testimonial.role}</p>}
                <p className="text-xs text-gray-400">Service Date: {testimonial.date}</p>
              </div>
              {/* Replies */}
              {testimonial.replies.length > 0 && (
                <div className="mt-4 border-t pt-2">
                  <p className="font-semibold text-sm text-primary-600 mb-1">Replies:</p>
                  {testimonial.replies.map(reply => (
                    <div key={reply.id} className="mb-1 text-sm text-gray-700">
                      <span className="font-bold">{reply.name}:</span> {reply.content} <span className="text-xs text-gray-400">({reply.date})</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Reply Form */}
              <div className="mt-4">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Reply..."
                  value={replyContent[testimonial.id] || ''}
                  onChange={e => setReplyContent({ ...replyContent, [testimonial.id]: e.target.value })}
                />
                <button className="btn-secondary mt-2" onClick={() => handleReply(testimonial.id)}>Reply</button>
              </div>
              {/* Admin Controls */}
              {isAdmin && (
                <div className="mt-4 flex gap-2">
                  {!testimonial.approved && <button className="btn-primary" onClick={() => handleApprove(testimonial.id)}>Approve</button>}
                  <button className="btn-danger" onClick={() => handleDelete(testimonial.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}