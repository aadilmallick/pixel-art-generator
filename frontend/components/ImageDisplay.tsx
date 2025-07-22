
import React from 'react';
import { PixelArtIcon } from './icons/PixelArtIcon';
import { GenerationType } from './GenerationTypeSelector';

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  prompt: string;
  generationType: GenerationType;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, prompt, generationType }) => {
  const placeholderText = `Your generated ${generationType === 'pixel-art' ? 'pixel art' : 'icon'} will appear here.`;
  const altText = `${generationType === 'pixel-art' ? 'Pixel art' : 'Icon'} of: ${prompt}`;

  return (
    <div className="mt-6 aspect-square w-full bg-gray-900 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300">
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-cyan-400">
          <svg className="animate-spin h-12 w-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg">Conjuring pixels...</p>
        </div>
      )}
      {!isLoading && image && (
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-contain pixelated"
        />
      )}
      {!isLoading && !image && (
        <div className="text-center text-gray-500 p-4">
            <PixelArtIcon className="w-16 h-16 mx-auto text-gray-600" />
            <p className="mt-4">{placeholderText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
