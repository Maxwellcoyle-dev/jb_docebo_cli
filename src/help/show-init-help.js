const showInitHelp = () => {
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
`);
};

export default showInitHelp;
