import { GoogleGenerativeAIError } from "@google/generative-ai";
import { CommandInteraction, DiscordjsError, TextChannel } from "discord.js";
import promptModel from "../../model/promptModel";
import botResponse from "../../util/botResponse";

export default async function ask(
  interaction: CommandInteraction,
  channel: TextChannel,
) {
  if (interaction.isChatInputCommand()) {
    const prompt = interaction.options.getString("question") ?? "";
    const userPromptMessage = `${interaction.user.displayName} asked **${prompt}** \n\n`;
    if (!prompt) {
      await interaction.reply("You need to give me someting to work with bruh");
      return;
    }

    await interaction.deferReply();
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
      // const startMessage = await channel.send(userPromptMessage);
      // const thread = await channel.threads.create({
      //   name: prompt,
      //   startMessage,
      // });
      // await thread.send(modelResponse);
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
