import { ChatSession } from "@google/generative-ai";
import getModel from "./getModel";

let chats: Record<string, ChatSession> = {};

export default async function getChat(chatId: string, modelId = "default") {
  const chat = chats[chatId];
  if (!chat) {
    const model = getModel(modelId);
    chats[chatId] = model.startChat({ history: [] });
  }
  return chats[chatId];
}
