import express from "express";
import dotenv from "dotenv";
import { buildRouter } from "@adapters/inbound/http/server";

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(buildRouter());

const port = Number(process.env.PORT || 3000);
app.listen(port, () =>
  console.log(`API is running at http://localhost:${port}`)
);
