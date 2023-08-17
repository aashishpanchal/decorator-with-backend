import { join } from "path";
import { config } from "dotenv";

function dotenv(filename: string) {
  const path = join(process.cwd(), filename);

  const { error } = config({
    path,
  });

  if (error) throw error;
}

dotenv(".env");
