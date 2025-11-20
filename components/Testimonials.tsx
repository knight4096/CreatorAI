import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Lifestyle Vlogger",
    content: "This tool literally cut my editing workflow in half. The caption generation is freakishly accurate to my tone!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Tech Reviewer",
    content: "The watermark removal instructions were exactly what I needed. Plus, the SEO tags for YouTube are gold.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    id: 3,
    name: "Elara V.",
    role: "TikTok Creator",
    content: "I was struggling with hook titles. The viral title variations this AI suggests are actually click-worthy without being cringe.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elara"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="mt-16 py-8 border-t border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">What Creators Are Saying</h2>
        <p className="text-gray-500 text-sm mt-2">Join 10,000+ creators growing faster with AI</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-purple-500" />
            </div>
            
            <div className="flex items-center gap-1 mb-4 text-yellow-400">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">"{review.content}"</p>
            
            <div className="flex items-center gap-3 mt-auto">
              <img 
                src={review.image} 
                alt={review.name} 
                className="w-10 h-10 rounded-full bg-gray-100"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                <p className="text-xs text-purple-600 font-medium">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};