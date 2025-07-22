import React, { useState, useCallback } from "react";
// import { generatePixelArt, generateIcon } from './services/geminiService';
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import ImageDisplay from "./components/ImageDisplay";
import Footer from "./components/Footer";
import GenerationTypeSelector, {
  GenerationType,
} from "./components/GenerationTypeSelector";

function App() {
  const [prompt, setPrompt] = useState<string>(
    "A majestic castle on a floating island"
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generationType, setGenerationType] =
    useState<GenerationType>("pixel-art");

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const endpoint =
        generationType === "pixel-art"
          ? "/api/generate/pixel-art"
          : "/api/generate/icon";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate image.");
      }
      const data = await response.json();
      setGeneratedImage(data.image);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate image. Please check your prompt or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, generationType]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 border border-purple-500/20 p-6 md:p-8">
          <GenerationTypeSelector
            generationType={generationType}
            setGenerationType={setGenerationType}
            isLoading={isLoading}
          />
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            generationType={generationType}
          />
          {error && (
            <div className="mt-4 text-center bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}
          <ImageDisplay
            image={generatedImage}
            isLoading={isLoading}
            prompt={prompt}
            generationType={generationType}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
