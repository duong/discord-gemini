import { Client, GatewayIntentBits } from "discord.js";
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
      ask(interaction);
    } else if (interaction.commandName === "instruct") {
      setInstruction(interaction);
    } else if (interaction.commandName === "server") {
      await interaction.reply(
        `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`,
      );
    }
  });

  client.login(token);

  return client;
}
