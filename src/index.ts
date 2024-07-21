import express from "express";
import run from "./run";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/healthz", (req, res) => {
  res.send("healthy");
});

app.get("/run", async (req, res) => {
  console.log("GET /run");
  const result = await run();
  console.log(result);
  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
