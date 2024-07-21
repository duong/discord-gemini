import getModel from "./getModel";

export default async function run() {
  const model = getModel();
  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
