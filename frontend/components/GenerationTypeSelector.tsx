
import React from 'react';

export type GenerationType = 'pixel-art' | 'icon';

interface GenerationTypeSelectorProps {
  generationType: GenerationType;
  setGenerationType: (type: GenerationType) => void;
  isLoading: boolean;
}

const GenerationTypeSelector: React.FC<GenerationTypeSelectorProps> = ({
  generationType,
  setGenerationType,
  isLoading,
}) => {
  return (
    <div className="w-full mb-6">
      <label htmlFor="generation-type" className="block text-lg text-cyan-300 mb-2">
        Generation Type:
      </label>
      <div className="relative">
        <select
          id="generation-type"
          value={generationType}
          onChange={(e) => setGenerationType(e.target.value as GenerationType)}
          disabled={isLoading}
          className="w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
        >
          <option value="pixel-art">Pixel Art</option>
          <option value="icon">Icon</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GenerationTypeSelector;
