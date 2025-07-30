#!/usr/bin/env node

const command = process.argv[2];

switch (command) {
  case "init":
    const { init } = await import("./commands/init.js");
    init();
    break;
  case "start":
    const { start } = await import("./commands/start.js");
    start();
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    const { help } = await import("./commands/help.js");
    help();
    break;
  default:
    console.log("Unknown command:", command);
    console.log("Use: docebo help");
    process.exit(1);
}
