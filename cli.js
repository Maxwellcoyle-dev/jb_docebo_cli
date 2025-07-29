#!/usr/bin/env node

import { init } from "./commands/init.js";
import { start } from "./commands/start.js";
import { help } from "./commands/help.js";

const command = process.argv[2];

switch (command) {
  case "init":
    init();
    break;
  case "start":
    start();
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    help();
    break;
  default:
    console.log("Unknown command:", command);
    console.log("Use: docebo help");
    process.exit(1);
}
