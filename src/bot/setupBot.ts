import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import ask from "./commands/ask";
import setInstruction from "./commands/setInstruction";

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
      const channel = client.channels.cache.get(interaction.channelId);
      if (!channel) {
        throw new Error("Failed to get channel");
      }
      if (channel.isTextBased()) {
        ask(interaction, channel as TextChannel);
      }
    } else if (interaction.commandName === "instruct") {
      setInstruction(interaction);
    } else if (interaction.commandName === "server") {
      await interaction.reply(
        `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`,
      );
    }
  });

  client.login(token);
}
