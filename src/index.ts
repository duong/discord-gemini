import express from "express";
import run from "./run";
import verifyDiscordRequest from "./verifyDiscordRequest";
import setupCommands from "./setupCommands";
import setupBot from "./setupBot";

const app = express();
const port = 3000;
const { CLIENT_ID, PUBLIC_KEY, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !PUBLIC_KEY || !DISCORD_TOKEN) {
  throw new Error("Missing required env vars");
}

setupCommands(DISCORD_TOKEN, CLIENT_ID);
const client = setupBot(DISCORD_TOKEN);

// Parse request body and verifies incoming requests using discord-interactions package
// app.use(express.json({ verify: verifyDiscordRequest(PUBLIC_KEY) }));

app.get("/healthz", (req, res) => {
  res.send("healthy");
});

app.get("/run", async (req, res) => {
  console.log("GET /run");
  const prompt = "Write a story about a magic backpack.";
  const result = await run(prompt);
  console.log(result);
  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
