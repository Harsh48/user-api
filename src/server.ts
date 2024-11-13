// src/server.ts
import app from "./app";
import logger from "./utils/logger";
import client from "prom-client";

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);

  setInterval(async () => {
    const metrics = await client.register.metrics();
    console.log("Metrics:\n", metrics);
  }, 10000);
});
