#!/usr/bin/env node

import startMigration from "../src/start-migration.js";

export function start() {
  startMigration(process.argv);
}

// If this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}
