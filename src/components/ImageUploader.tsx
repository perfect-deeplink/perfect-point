'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ImageUploaderProps {
  onUpload: (base64: string) => void;
  currentImage?: string | null;
  label?: string;
  className?: string;
}

export default function ImageUploader({ onUpload, currentImage, label = "Upload Image", className = "" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 800; // Limit image width for D1 constraints
          if (width > MAX_WIDTH) {
            height = Math.floor((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
             ctx.drawImage(img, 0, 0, width, height);
             // Compress heavily to keep the DB footprint extremely small
             const compressedBase64 = canvas.toDataURL('image/webp', 0.8);
             setPreview(compressedBase64);
             onUpload(compressedBase64);
          }
          setLoading(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Image compression error:', err);
      alert('Error processing image. Please try a different file.');
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUpload('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`mb-4 w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border-2 border-gray-200 w-full max-w-sm mx-auto">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={preview} alt="Preview" className="w-full h-auto object-cover max-h-48" />
           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button type="button" onClick={removeImage} className="bg-red-500 text-white rounded-full p-2 px-4 hover:bg-red-600 transition shadow-lg flex items-center gap-2">
               <FontAwesomeIcon icon={faTimes} /> Remove
             </button>
           </div>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition min-h-[140px]"
          onClick={() => fileInputRef.current?.click()}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-primary mb-2" />
          ) : (
            <>
               <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400 mb-3" />
               <span className="text-sm font-semibold text-secondary">Click to upload image</span>
               <span className="text-xs text-gray-500 mt-1">Auto-compresses to save space</span>
            </>
          )}
          <input 
             type="file" 
             ref={fileInputRef} 
             accept="image/*" 
             className="hidden" 
             onChange={handleFileChange}
             disabled={loading}
          />
        </div>
      )}
    </div>
  );
}
