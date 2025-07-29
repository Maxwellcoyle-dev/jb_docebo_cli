#!/usr/bin/env node

function showGeneralHelp() {
  console.log(`
🚀 Docebo Migration CLI - Help Guide
=====================================

This CLI tool helps you migrate data from local CSV files into Docebo.

❓ Getting Started:
==================
1. Run: init-docebo-migration
2. Follow the prompts to enter your Docebo platform URL and API token
3. Place your CSV file in the project directory
4. Run: start-migration
5. Follow the prompts to select the CSV file you want to import and the type of migration you want to perform
6. Follow the prompts to confirm the data to be imported
7. Wait for the migration to complete
8. Check your Docebo platform to see the imported data

�� Available Commands:
=====================

1. init-docebo-migration (or @maximousprime/docebo-migration-cli)
   Initializes and configures a new migration project.
   
   Usage: init-docebo-migration [options]
   
   Options:
   --platform-url, -p    Platform URL for Docebo
   --api-token, -a       API token for authentication
   --confirm, -c         Skip confirmation prompts
   --help, -h            Show help for this command
   
   Example:
   init-docebo-migration --platform-url https://your-domain.docebosaas.com --api-token your-token

2. start-migration
   Starts the actual migration process using a CSV file.
   
   Usage: start-migration [options]
   
   Options:
   --file, -f            Path to the CSV file to import
   --continue, -c        Skip confirmation prompts
   --help, -h            Show help for this command
   
   Example:
   start-migration --file user_enrollments.csv

3. docebo-help
   Shows this help guide or specific command help.
   
   Usage: docebo-help [command]
   
   Examples:
   docebo-help                    # Show general help
   docebo-help init              # Show help for init command
   docebo-help start             # Show help for start command

📁 File Structure:
=================
After running init-docebo-migration, you'll have:
- .env file with your configuration
- CSV file(s) ready for import

📝 CSV Format Requirements:
==========================
Your CSV file should contain user enrollment data with appropriate headers.
The tool will automatically parse and validate the data before import.

🔧 Prerequisites:
=================
1. Valid Docebo platform URL
2. API token with appropriate permissions
3. CSV file with user enrollment data

💡 Tips:
========
- Always test with a small CSV file first
- Ensure your API token has the necessary permissions
- Check your CSV format before running migrations
- Use --continue flag to skip confirmations in automated scripts

🆘 Need More Help?
==================
For issues or questions, please check the documentation or contact support.
`);
}

function showInitHelp() {
  console.log(`
📋 init-docebo-migration Command Help
====================================

Initializes and configures a new Docebo migration project.

Usage: init-docebo-migration [options]

Options:
  --platform-url, -p    Platform URL for Docebo (e.g., https://your-domain.docebosaas.com)
  --api-token, -a       API token for authentication
  --confirm, -c         Skip confirmation prompts
  --help, -h            Show this help message

Examples:
  init-docebo-migration
  init-docebo-migration --platform-url https://company.docebosaas.com
  init-docebo-migration --platform-url https://company.docebosaas.com --api-token abc123

This command will:
1. Prompt for your Docebo platform URL
2. Prompt for your API token
3. Create a .env file with your configuration
4. Validate your credentials

Prerequisites:
- Valid Docebo platform URL
- API token with appropriate permissions
`);
}

function showStartHelp() {
  console.log(`
📋 start-migration Command Help
==============================

Starts the actual migration process using a CSV file.

Usage: start-migration [options]

Options:
  --file, -f            Path to the CSV file to import
  --continue, -c        Skip confirmation prompts
  --help, -h            Show this help message

Examples:
  start-migration
  start-migration --file user_enrollments.csv
  start-migration --file data.csv --continue

This command will:
1. Check for required .env configuration
2. Parse and validate your CSV file
3. Show a summary of data to be imported
4. Import the data to Docebo
5. Provide progress updates and results

Prerequisites:
- Must run init-docebo-migration first
- CSV file must be in the project directory
- Valid .env file with API_TOKEN and PLATFORM_URL
`);
}

// Main help function
function showHelp() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "init":
    case "init-docebo-migration":
      showInitHelp();
      break;
    case "start":
    case "start-migration":
      showStartHelp();
      break;
    default:
      showGeneralHelp();
  }
}

showHelp();
