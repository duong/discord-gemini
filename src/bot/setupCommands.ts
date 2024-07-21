import { REST, Routes, SlashCommandBuilder } from "discord.js";

export default async function setupCommands(token: string, clientId: string) {
  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Provides information about the server."),
    new SlashCommandBuilder()
      .setName("ask")
      .setDescription("Ask Bot a serious question")
      .addStringOption((option) =>
        option
          .setName("question")
          .setDescription("The question you want to ask")
          .setMaxLength(200),
      ),
    new SlashCommandBuilder()
      .setName("instruct")
      .setDescription("Set the system instruction")
      .addStringOption((option) =>
        option
          .setName("instruction")
          .setDescription(
            "The system instruction. E.g. You are a cat. Your name is Neko.",
          )
          .setMaxLength(200),
      ),
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
