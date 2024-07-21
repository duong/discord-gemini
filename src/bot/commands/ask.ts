import { GoogleGenerativeAIError } from "@google/generative-ai";
import { CommandInteraction, DiscordjsError } from "discord.js";
import promptModel from "../../model/promptModel";

const botResponse = (userPromptMessage: string, modelResponse: string) => {
  return [userPromptMessage, modelResponse].join(" ");
};

export default async function ask(interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) {
    const prompt = interaction.options.getString("question") ?? "";
    const userPromptMessage = `${interaction.user.displayName} asked **${prompt}** \n\n`;
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
      const message = (error as GoogleGenerativeAIError).message;
      return await interaction.editReply(
        botResponse(userPromptMessage, message),
      );
    }

    try {
      await interaction.editReply(
        botResponse(userPromptMessage, modelResponse),
      );
    } catch (error) {
      const message = (error as DiscordjsError).message;
      console.error(error);
      await interaction.editReply(message);
    }
  }
}
