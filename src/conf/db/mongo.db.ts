import mongoose from "mongoose";
import settings from "../settings";

export const dbInit = async () => {
  // step 1 create option of mongoose database
  const dbOptions: mongoose.ConnectOptions = {
    dbName: settings.db.dbName,
    autoIndex: true,
  };
  // create connection between server and mongodb
  await mongoose.connect(settings.db.uri, dbOptions);

  mongoose.connection.on("error", (err) => {
    console.error(err.message);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};
