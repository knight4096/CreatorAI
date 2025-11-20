import React, { useRef } from 'react';
import { Upload, Video, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  preview: string | null;
  fileName?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, preview, fileName }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 transition-colors bg-gray-50/50 group cursor-pointer" onClick={triggerUpload}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/*,video/*"
      />
      
      {preview ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md bg-black">
             <img src={preview} alt="Upload preview" className="w-full h-full object-contain" />
             <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                {fileName}
             </div>
             <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow cursor-pointer" onClick={(e) => {
                 e.stopPropagation();
                 // Reset handled by parent ideally, but simplified here
                 inputRef.current!.value = '';
             }}>
                 <X className="w-4 h-4 text-gray-800" />
             </div>
        </div>
      ) : fileName ? (
        <div className="flex flex-col items-center justify-center py-8">
             <Video className="w-16 h-16 text-purple-500 mb-4" />
             <p className="font-medium text-gray-900">{fileName}</p>
             <p className="text-sm text-gray-500 mt-1">Click to change file</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-200 group-hover:scale-105 transition-transform">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Upload Your Content</h3>
          <p className="text-gray-500 text-sm mb-6">Drag & drop or click to browse</p>
          <div className="px-6 py-2 bg-purple-600 text-white rounded-full text-sm font-medium shadow hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Select File
          </div>
          <p className="mt-4 text-xs text-gray-400">Supports MP4, JPG, PNG • Max 100MB</p>
        </div>
      )}
    </div>
  );
};