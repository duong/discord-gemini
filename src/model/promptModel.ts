import getChat from "./getChat";

export default async function promptModel(prompt: string) {
  const chat = await getChat();
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  return response.text();
}
