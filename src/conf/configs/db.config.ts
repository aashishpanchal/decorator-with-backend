import env from "@core/utils/env";

export function dbConfig() {
  return {
    uri: env<string>("DB_URI"),
    dbName: env<string>("DB_NAME"),
  };
}
