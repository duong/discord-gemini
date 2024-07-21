import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export default async function setupBot(token: string) {
  client.on("ready", () => {
    console.log(`Logged in as ${client?.user?.tag ?? "<missing user tag>"}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (interaction.commandName === "ask-dad") {
      await interaction.reply("Pong!");
    }
  });

  client.login(token);

  return client;
}
