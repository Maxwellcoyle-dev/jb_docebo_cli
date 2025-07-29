// in this file - i want the user to be able to trigger the file import.
// the import includes 2 steps
// handle file where we get the filename that the user gives and then parse the csv
// next we pass that json data to the iomport data file and it imports the file into docebo
// the user should be able to enter a command - to trigger this. it is dependednt on the init file already running

import arg from "arg";
import { confirm, select } from "@inquirer/prompts";

import checkEnvFile from "./utils/check-env-file.js";
import showStartHelp from "./help/show-start-help.js";
import csvParser from "./utils/csv-parser.js";
import doceboImporter from "./utils/docebo-importer.js";
import dataValidationRouter from "./data-validation/data-validation-router.js";
import listCsvFiles from "./utils/list-csv-files.js";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--file-name": String,
      "--continue": Boolean,
      "--migration-type": String,
      "--help": Boolean,
      "-f": "--file-name",
      "-c": "--continue",
      "-t": "--migration-type",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    fileName: args["--file-name"],
    continue: args["--continue"],
    migrationType: args["--migration-type"],
    help: args["--help"],
  };
}

const promptForFileName = async () => {
  const fileName = await select({
    message:
      "Choose the CSV file you want to import. Use arrow keys to navigate and enter to select.",
    choices: listCsvFiles(),
  });
  return fileName;
};

const promptForMigrationType = async () => {
  const migrationType = await select({
    message:
      "Please select the type of migration you want to perform. Use arrow keys to navigate and enter to select.",
    choices: ["enrollments"],
  });
  return migrationType;
};

const startMigration = async (args) => {
  let options = parseArgumentsIntoOptions(args);

  // Show help if requested
  if (options.help) {
    showStartHelp();
    return;
  }

  // Check if .env file exists and has required variables
  checkEnvFile();

  // Get filename from command line or prompt
  if (!options.fileName) {
    options.fileName = await promptForFileName();
    options.migrationType = await promptForMigrationType();
  }

  console.log(`📁 Processing file: ${options.fileName}`);

  try {
    // Step 1: Handle and parse the CSV file
    console.log("🔄 Parsing CSV file...");
    const jsonData = await csvParser(options.fileName);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(
      `✅ CSV parsed successfully. Found ${jsonData.length} records.`
    );

    // log for valiting data with cool emoji
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`🔄 Validating ${options.migrationType} data...`);
    const validData = dataValidationRouter(options.migrationType, jsonData);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Step 2: Confirm before importing
    if (!options.continue) {
      const shouldContinue = await confirm({
        message: `Do you want to import ${validData.length} records to Docebo?`,
      });

      if (!shouldContinue) {
        console.log("❌ Migration cancelled.");
        return;
      }
    }

    // Step 3: Import data to Docebo
    console.log("🚀 Starting data import to Docebo...");
    await doceboImporter(jsonData, options.migrationType);
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Error during migration:", error.message);
    process.exit(1);
  }
};

export default startMigration;
