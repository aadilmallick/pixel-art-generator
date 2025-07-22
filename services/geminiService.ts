import { GoogleGenAI } from "npm:@google/genai";

const _API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!_API_KEY) {
  throw new Error("gemini API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: _API_KEY! });

async function createImage(prompt: string) {
  const response = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: "image/png",
      aspectRatio: "1:1",
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("API returned no images.");
  }

  const base64ImageBytes: string =
    response.generatedImages[0].image!.imageBytes!;
  return `data:image/png;base64,${base64ImageBytes}`;
}

/**
 * Generates pixel art from a text prompt using the Imagen model.
 * @param userPrompt The user's description of the desired image.
 * @returns A base64-encoded data URL of the generated PNG image.
 */
export const generatePixelArt = async (userPrompt: string): Promise<string> => {
  try {
    // Enhance the prompt to guide the model towards a pixel art style
    const fullPrompt = `Pixel art, 16-bit retro style of: ${userPrompt}.`;
    return await createImage(fullPrompt);
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error(
      "Could not generate pixel art. The model may have refused the prompt."
    );
  }
};

/**
 * Generates pixel art from a text prompt using the Imagen model.
 * @param userPrompt The user's description of the desired image.
 * @returns A base64-encoded data URL of the generated PNG image.
 */
export const generateIcon = async (userPrompt: string): Promise<string> => {
  try {
    // Enhance the prompt to guide the model towards a pixel art style
    const fullPrompt = `sleek, minimalistic icon, no words, adhering to chrome extension standards: ${userPrompt}.`;
    return await createImage(fullPrompt);
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error(
      "Could not generate icon. The model may have refused the prompt."
    );
  }
};
