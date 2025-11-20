import React from 'react';
import { Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-medium mb-6 animate-fade-in">
        <Star className="w-3 h-3 fill-purple-600" />
        <span>Trusted by 10,000+ Content Creators</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
        AI Caption <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Generator</span>
      </h1>
      
      <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
        Upload any video, audio, or image. Our AI extracts meaning, writes viral hooks, generates thumbnails, and optimizes for every platform.
      </p>
    </div>
  );
};