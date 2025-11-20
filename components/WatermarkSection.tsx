import React from 'react';
import { WatermarkConfig, WatermarkPosition } from '../types';
import { Droplets, Lock, AlertCircle, LayoutGrid, Move } from 'lucide-react';

interface WatermarkSectionProps {
  config: WatermarkConfig;
  onChange: (config: WatermarkConfig) => void;
}

export const WatermarkSection: React.FC<WatermarkSectionProps> = ({ config, onChange }) => {

  const toggleAddWatermark = () => {
    onChange({ ...config, addWatermark: !config.addWatermark });
  };

  const updatePosition = (pos: WatermarkPosition) => {
    onChange({ ...config, watermarkPosition: pos });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-500 font-medium">
        <Droplets className="w-5 h-5" />
        <span>Watermark Options</span>
        <Lock className="w-4 h-4 ml-auto text-gray-300" />
      </div>

      {/* Warning Card */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-orange-800 leading-relaxed">
          <span className="font-semibold">Note:</span> Visual watermark processing happens on the backend. 
          Here we analyze and generate instructions for the AI engine.
        </p>
      </div>

      {/* Remove Watermark Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Remove Existing Watermark</h3>
          <p className="text-xs text-gray-500">AI-powered detection and removal instructions</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={config.removeWatermark}
            onChange={(e) => onChange({...config, removeWatermark: e.target.checked})}
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      {/* Add Watermark Section */}
      <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ${config.addWatermark ? 'ring-2 ring-blue-100' : ''}`}>
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Add Custom Watermark</h3>
            <p className="text-xs text-gray-500">
               Add your text or logo watermark
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.addWatermark}
              onChange={toggleAddWatermark}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {/* Expandable Settings */}
        {config.addWatermark && (
          <div className="px-4 pb-6 pt-2 space-y-5 border-t border-gray-50 bg-gray-50/50">
            
            {/* Text Input */}
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Watermark Text</label>
                <input 
                    type="text"
                    value={config.customWatermarkText}
                    onChange={(e) => onChange({...config, customWatermarkText: e.target.value})}
                    placeholder="e.g. @mychannel or Brand Name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                />
            </div>

            {/* Position Selector */}
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <LayoutGrid className="w-3 h-3" /> Position
                </label>
                <div className="flex gap-2">
                    {/* Simple 3x2 visual grid representation for simplified UI */}
                    {['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'].map((pos) => (
                        <button
                            key={pos}
                            onClick={() => updatePosition(pos as WatermarkPosition)}
                            className={`h-10 flex-1 rounded-lg border text-xs font-medium transition-all
                                ${config.watermarkPosition === pos 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }
                            `}
                        >
                            {pos.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Size Slider */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-medium text-gray-700">Size</label>
                        <span className="text-xs text-gray-500">{config.watermarkSize}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={config.watermarkSize} 
                        onChange={(e) => onChange({...config, watermarkSize: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Opacity Slider */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-medium text-gray-700">Opacity</label>
                        <span className="text-xs text-gray-500">{config.watermarkOpacity}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={config.watermarkOpacity} 
                        onChange={(e) => onChange({...config, watermarkOpacity: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};