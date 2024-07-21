import { ChatSession } from "@google/generative-ai";
import getModel from "./getModel";

let chat: ChatSession;

export default async function getChat() {
  if (!chat) {
    const model = getModel();
    chat = model.startChat({ history: [] });
  }
  return chat;
}
