import React from 'react';
import { Wand2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <Wand2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">CreatorAI</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            How it works
          </button>
          <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </button>
          <div className="h-5 w-px bg-gray-200 hidden md:block"></div>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Sign In
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
};