const showStartHelp = () => {
  console.log(`
📋 docebo start Command Help
===========================

Starts the actual migration process using a CSV file.

Usage: docebo start [options]

Options:
  --file-name, -f       Path to the CSV file to import
  --continue, -c        Skip confirmation prompts
  --migration-type, -t  Type of migration (enrollments)
  --help, -h            Show this help message

Examples:
  docebo start
  docebo start --file-name user_enrollments.csv
  docebo start --file-name data.csv --continue

This command will:
1. Check for required .env configuration
2. Parse and validate your CSV file
3. Show a summary of data to be imported
4. Import the data to Docebo
5. Provide progress updates and results

Prerequisites:
- Must run docebo init first
- CSV file must be in the project directory
- Valid .env file with API_TOKEN and PLATFORM_URL
`);
};

export default showStartHelp;
