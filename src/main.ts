import "./conf/dotenv";
import "reflect-metadata";
import { app } from "./app";
import { dbInit } from "./conf/db";
import settings from "./conf/settings";

async function bootstrap() {
  // config database
  await dbInit();
  // config server
  const { host, port, nodeEnv } = settings.app;
  // server listen
  app.listen(port, host, () => {
    console.log("Server version 1.0.0");
    console.log("Power by Aashish Panchal");
    console.log(`Starting ${nodeEnv} server at http://${host}:${port}`);
    console.log("Quit the server with CTRL-BREAK.");
  });
}

bootstrap();
