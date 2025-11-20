import React from 'react';
import { Platform } from '../types';
import { Instagram, Youtube, Music2 } from 'lucide-react';

interface PlatformSelectorProps {
  selected: Platform;
  onSelect: (p: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <button
        onClick={() => onSelect(Platform.Instagram)}
        className={`relative h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
          selected === Platform.Instagram
            ? 'border-transparent bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-200'
            : 'border-gray-100 bg-white text-gray-600 hover:border-pink-200 hover:bg-pink-50'
        }`}
      >
        <Instagram className="w-8 h-8 mb-2" />
        <span className="font-semibold">Instagram</span>
      </button>

      <button
        onClick={() => onSelect(Platform.TikTok)}
        className={`relative h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
          selected === Platform.TikTok
            ? 'border-transparent bg-black text-white shadow-lg shadow-gray-300'
            : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <Music2 className="w-8 h-8 mb-2" />
        <span className="font-semibold">TikTok</span>
      </button>

      <button
        onClick={() => onSelect(Platform.YouTube)}
        className={`col-span-2 relative h-20 rounded-2xl border-2 flex flex-row items-center justify-center gap-3 transition-all duration-200 ${
          selected === Platform.YouTube
            ? 'border-transparent bg-red-600 text-white shadow-lg shadow-red-200'
            : 'border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50'
        }`}
      >
        <Youtube className="w-8 h-8" />
        <span className="font-semibold text-lg">YouTube</span>
      </button>
    </div>
  );
};