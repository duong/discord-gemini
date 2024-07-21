import { CommandInteraction } from "discord.js";
import promptModel from "../../model/promptModel";

export default async function ask(interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) {
    const prompt = interaction.options.getString("question") ?? "";
    if (!prompt) {
      await interaction.reply("You need to give me someting to work with bruh");
      return;
    }

    await interaction.deferReply({ ephemeral: true });
    let modelResponse;
    try {
      modelResponse = await promptModel(prompt);
    } catch (error) {
      console.error(error);
      await interaction.editReply("I failed to come up with something :(");
    }

    const userPromptMessage = `${interaction.user.displayName} asked **${prompt}** \n\n`;
    const botResponse = [userPromptMessage, modelResponse].join(" ");
    try {
      await interaction.editReply(botResponse);
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        "failed to send the response back through discord",
      );
    }
  }
}
