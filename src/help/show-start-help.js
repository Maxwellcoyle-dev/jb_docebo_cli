const showStartHelp = () => {
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
};

export default showStartHelp;
