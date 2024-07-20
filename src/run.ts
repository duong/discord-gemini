import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function run() {
  if (!process.env.API_KEY) {
    throw new Error("missing API_KEY");
  }

  const prompt = "what is the most important branch of mathematics?";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}
