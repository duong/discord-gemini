export default function botResponse(
  userPromptMessage: string,
  modelResponse: string,
) {
  return [userPromptMessage, modelResponse].join(" ");
}
