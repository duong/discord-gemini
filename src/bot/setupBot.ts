import { Client, GatewayIntentBits } from "discord.js";
import promptModel from "../model/promptModel";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

export default async function setupBot(token: string) {
  client.on("ready", () => {
    console.log(`Logged in as ${client?.user?.tag ?? "<missing user tag>"}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (interaction.commandName === "ask") {
      if (interaction.isChatInputCommand()) {
        const prompt = interaction.options.getString("question") ?? "";
        if (prompt) {
          const modelResponse = await promptModel(prompt);
          const userPromptMessage = `${interaction.user.displayName} asked **${prompt}** \n\n`;
          const botResponse = [userPromptMessage, modelResponse].join(" ");
          await interaction.reply(botResponse);
        } else {
          await interaction.reply(
            "You need to give me someting to work with bruh",
          );
        }
      }
    } else if (interaction.commandName === "server") {
      await interaction.reply(
        `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`,
      );
    }
  });

  client.login(token);

  return client;
}
