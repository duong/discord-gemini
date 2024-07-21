import setupBot from "./bot/setupBot";
import setupCommands from "./bot/setupCommands";

const { CLIENT_ID, PUBLIC_KEY, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !PUBLIC_KEY || !DISCORD_TOKEN) {
  throw new Error("Missing required env vars");
}

setupCommands(DISCORD_TOKEN, CLIENT_ID);
setupBot(DISCORD_TOKEN);
