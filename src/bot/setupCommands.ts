import { REST, Routes } from "discord.js";

export default async function setupCommands(token: string, clientId: string) {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
    {
      name: "ask-dad",
      description: "Ask Dad Bot a really serious question",
    },
  ];

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
