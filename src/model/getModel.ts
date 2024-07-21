import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

let models: Record<string, GenerativeModel> = {};

export default function getModel(
  modelId = "default",
  systemInstruction?: string,
) {
  const model = models[modelId];
  if (!model) {
    if (!process.env.API_KEY) {
      throw new Error("missing API_KEY");
    }
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    models[modelId] = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
      generationConfig: { maxOutputTokens: 400 }, // Discord has reply limit of 2000 characters
    });
  }

  return models[modelId];
}
