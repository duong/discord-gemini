import getModel from "./getModel";

export default async function promptModel(prompt: string) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
