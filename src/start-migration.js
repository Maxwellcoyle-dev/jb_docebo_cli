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
    const chunks = await csvParser(options.fileName);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const totalRecords = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    console.log(
      `✅ CSV parsed: ${totalRecords} records in ${chunks.length} chunks`
    );

    // Step 2: Validate data
    console.log(`🔄 Validating ${options.migrationType} data...`);
    const validChunks = chunks.map((chunk) =>
      dataValidationRouter(options.migrationType, chunk)
    );
    console.log(`✅ Validation complete`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 3: Confirm before importing
    if (!options.continue) {
      // Show preview of first record
      console.log("\n📋 Data Preview (first record):");
      console.log("=".repeat(50));
      console.log(JSON.stringify(validChunks[0][0], null, 2));
      console.log("=".repeat(50));

      const shouldContinue = await confirm({
        message: `Import ${totalRecords} records to Docebo?`,
      });

      if (!shouldContinue) {
        console.log("❌ Migration cancelled.");
        return;
      }
    }

    // Step 4: Import data to Docebo
    const result = await doceboImporter(validChunks, options.migrationType);

    // Final result handling
    if (result.summary.successRate === 100) {
      console.log(
        `🎉 All ${result.summary.totalRecords} records imported successfully!`
      );
    } else {
      console.log(
        `⚠️  Migration completed with ${result.summary.failedChunks} failed chunks`
      );
    }
  } catch (error) {
    console.error("❌ Error during migration:", error.message);
    process.exit(1);
  }
};

export default startMigration;
