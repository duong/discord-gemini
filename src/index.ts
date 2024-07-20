import { GoogleGenerativeAI } from "@google/generative-ai";

const main = () => {
  if (!process.env.API_KEY) {
    throw new Error("missing API_KEY");
  }

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

if (require.main === module) {
  main();
}
