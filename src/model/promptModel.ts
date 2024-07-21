import getChat from "./getChat";

export default async function promptModel(prompt: string, chatId = "default") {
  const chat = await getChat(chatId);
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  return response.text();
}
