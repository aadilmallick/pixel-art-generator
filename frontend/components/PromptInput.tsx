
import React from 'react';
import { GenerationType } from './GenerationTypeSelector';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  generationType: GenerationType;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, generationType }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  const buttonText = `Generate ${generationType === 'pixel-art' ? 'Pixel Art' : 'Icon'}`;

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="prompt-input" className="text-lg text-cyan-300">Enter your vision:</label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., a knight fighting a dragon in a volcano"
        className="w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none h-24"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default PromptInput;
