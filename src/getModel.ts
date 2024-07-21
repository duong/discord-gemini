import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

let model: GenerativeModel;

export default function getModel() {
  if (!model) {
    if (!process.env.API_KEY) {
      throw new Error("missing API_KEY");
    }
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  return model;
}
