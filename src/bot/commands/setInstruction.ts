import { CommandInteraction } from "discord.js";
import getModel from "../../model/getModel";

export default async function setInstruction(interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) {
    const instruction = interaction.options.getString("instruction") ?? "";
    if (instruction) {
      getModel(instruction);
      await interaction.reply(`Set model instruction to **${instruction}**`);
    } else {
      await interaction.reply("You need to give me someting to work with bruh");
    }
  }
}
