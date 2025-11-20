import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlatformSelector } from './components/PlatformSelector';
import { FileUpload } from './components/FileUpload';
import { WatermarkSection } from './components/WatermarkSection';
import { ResultDisplay } from './components/ResultDisplay';
import { Testimonials } from './components/Testimonials';
import { generateCreatorContent } from './services/geminiService';
import { Platform, AnalysisState, WatermarkConfig } from './types';
import { Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.Instagram);
  const [captionLanguage, setCaptionLanguage] = useState<string>('English');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    removeWatermark: false,
    addWatermark: false,
    customWatermarkText: '',
    watermarkPosition: 'bottom-right',
    watermarkSize: 20,
    watermarkOpacity: 80,
  });
  const [autoThumbnail, setAutoThumbnail] = useState<boolean>(false);
  
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null,
  });

  // Handlers
  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    // Create preview URL
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null); // Video preview handling skipped for simplicity in this demo
    }
  }, []);

  const handleGenerate = async () => {
    if (!description && !file) {
      setAnalysisState(prev => ({ ...prev, error: 'Please provide a description or upload a file.' }));
      return;
    }

    setAnalysisState({ isLoading: true, result: null, error: null });

    try {
      const content = await generateCreatorContent(
        selectedPlatform,
        captionLanguage,
        description,
        file,
        watermarkConfig,
        autoThumbnail
      );
      setAnalysisState({ isLoading: false, result: content, error: null });
    } catch (err: any) {
      setAnalysisState({ 
        isLoading: false, 
        result: null, 
        error: err.message || "An unexpected error occurred." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-12">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4">
        <Hero />
        
        <div className="space-y-6">
          {/* Platform Selection */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Platform</h2>
            <PlatformSelector selected={selectedPlatform} onSelect={setSelectedPlatform} />
          </section>

          {/* File Upload */}
          <section className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
               <FileUpload onFileSelect={handleFileSelect} preview={filePreview} fileName={file?.name} />
          </section>

          {/* Language & Description */}
          <section className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <Sparkles className="w-4 h-4 inline mr-1 text-purple-500" />
                Caption Language
              </label>
              <select 
                value={captionLanguage}
                onChange={(e) => setCaptionLanguage(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Bangla">Bangla</option>
                <option value="Hindi">Hindi</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Video Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your video content, theme, or emotion... (e.g., 'A motivational video about overcoming challenges')"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all text-gray-700 placeholder-gray-400"
              />
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                AI will detect objects/brands, extract multi-language text, transcribe audio with noise reduction, and analyze scene composition.
              </p>
            </div>
          </section>

          {/* Watermark & Extras */}
          <WatermarkSection 
            config={watermarkConfig} 
            onChange={setWatermarkConfig} 
          />

          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Auto Generate Thumbnail</h3>
              <p className="text-xs text-gray-500">Generate 4 AI concepts based on visual analysis</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoThumbnail}
                onChange={(e) => setAutoThumbnail(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={analysisState.isLoading}
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
              ${analysisState.isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90'
              }`}
          >
            {analysisState.isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze & Generate
              </>
            )}
          </button>

          {/* Error Display */}
          {analysisState.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
              {analysisState.error}
            </div>
          )}

          {/* Result Display */}
          {analysisState.result && (
            <ResultDisplay result={analysisState.result} />
          )}

          {/* Testimonials Section */}
          <Testimonials />
        </div>
      </main>
    </div>
  );
};

export default App;