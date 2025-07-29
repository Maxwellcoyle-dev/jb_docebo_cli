import fs from "fs";
import path from "path";

const checkEnvFile = () => {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    console.error(
      '❌ .env file not found. Please run "init-docebo-migration" first.'
    );
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  if (
    !envContent.includes("API_TOKEN=") ||
    !envContent.includes("PLATFORM_URL=")
  ) {
    console.error(
      '❌ Missing required environment variables. Please run "init-docebo-migration" first.'
    );
    process.exit(1);
  }

  return true;
};

export default checkEnvFile;
