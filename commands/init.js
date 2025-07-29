#!/usr/bin/env node

import initMigration from "../src/init-migration.js";

export function init() {
  initMigration(process.argv);
}

// If this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  init();
}
