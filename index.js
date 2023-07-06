import minimist from "minimist";
import { App } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

// Parsing command-line arguments
const { greeting, who, width, height, color, size, fileName } = minimist(
  process.argv.slice(2)
);

// Creating an instance of the application and starting the merging process
const app = new App(greeting, who, width, height, color, size, fileName);

async function start() {
  try {

    await app.mergeAndSave().catch((error) => {
      console.error("An error occured while doing merging & downloading:", err);
      throw err;
    });
    console.log("Merge completed successfully.");
  } catch (err) {
    console.error("Error while doing merge & download process:", err);
  }
}

start();
