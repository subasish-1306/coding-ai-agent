import React, { useState, useRef } from 'react';
import { UploadCloud, FileArchive, CheckCircle2, AlertCircle } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
  error?: string | null;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onFileSelected, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file && validateAndSetFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file && validateAndSetFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const validateAndSetFile = (file: File): boolean => {
    if (!file.name.endsWith('.zip')) {
      alert('Please upload a valid .zip file');
      return false;
    }
    setSelectedFile(file);
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".zip"
          className="hidden"
        />

        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-sky-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Drop your repository ZIP here
        </h3>

        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Supports source code archives up to 200MB. Automatically filters build artifacts, node_modules, and cache files.
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all shadow-lg shadow-sky-600/20">
          <FileArchive className="w-4 h-4" />
          <span>Browse File</span>
        </div>

        {selectedFile && (
          <div className="mt-6 p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center gap-2 text-sm text-sky-300 max-w-sm mx-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="truncate">{selectedFile.name}</span>
            <span className="text-slate-400 text-xs">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
