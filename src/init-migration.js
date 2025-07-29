import arg from "arg";
import { input, confirm } from "@inquirer/prompts";

import showInitHelp from "./help/show-init-help.js";
import saveInputToEnvFile from "./utils/save-input-to-env.js";

// lets add one final step for the usert to confirm the inputs

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--platform-url": String,
      "--api-token": String,
      "--confirm": Boolean,
      "--help": Boolean,
      "-p": "--platform-url",
      "-a": "--api-token",
      "-c": "--confirm",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    platformUrl: args["--platform-url"],
    apiToken: args["--api-token"],
    confirm: args["--confirm"],
    help: args["--help"],
  };
}

const promptForPlatformUrl = async () => {
  const platformUrl = await input({
    message: "Please enter platform url",
  });
  return platformUrl;
};

const promptForApiToken = async () => {
  const apiToken = await input({
    message: "Please enter your API token",
  });
  return apiToken;
};

const promptForConfirmation = async () => {
  const confirmation = await confirm({
    message: "Does this look correct?",
  });
  return confirmation;
};

const initMigration = async (args) => {
  let options = parseArgumentsIntoOptions(args);

  // Show help if requested
  if (options.help) {
    showInitHelp();
    return;
  }

  options.platformUrl = await promptForPlatformUrl();
  options.apiToken = await promptForApiToken();

  console.log({
    platformUrl: options.platformUrl,
    apiToken: options.apiToken,
  });

  options.confirmation = await promptForConfirmation();

  if (options.confirmation) {
    console.log("✅ migration project initiated");
    saveInputToEnvFile(options.platformUrl, "PLATFORM_URL");
    saveInputToEnvFile(options.apiToken, "API_TOKEN");
    console.log("✅ .env file created with PLATFORM_URL");
    console.log("✅ API_TOKEN added to .env file");
    console.log("✅ migration project initiated");
    console.log("");
    console.log("🚀 Next steps:");
    console.log("1. To start migration, run: docebo start");
    console.log("2. For help, run: docebo help");
    console.log("");
    console.log("💡 Tip: You can also install globally for easier use:");
    console.log("   npm install -g @maximousprime/jb_docebo_cli");
    console.log("   Then use: docebo start, docebo init, docebo help");
  } else {
    console.log("Exiting the process");
  }
};

export default initMigration;
