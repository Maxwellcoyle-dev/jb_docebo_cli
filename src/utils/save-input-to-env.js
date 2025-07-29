import fs from "fs";
import path from "path";

const saveInputToEnvFile = (input, key) => {
  const envPath = path.join(process.cwd(), ".env");
  const envContent = `\n${key}=${input}`;

  try {
    // Check if .env file already exists
    if (fs.existsSync(envPath)) {
      // Read existing content
      const existingContent = fs.readFileSync(envPath, "utf8");

      // Check if API_TOKEN already exists
      if (existingContent.includes(key)) {
        // Replace existing API_TOKEN line
        const updatedContent = existingContent.replace(
          new RegExp(`${key}=.*`),
          `${key}=${input}`
        );
        fs.writeFileSync(envPath, updatedContent);
        console.log(`✅ ${key} updated in .env file`);
      } else {
        // Append new API_TOKEN
        fs.appendFileSync(envPath, envContent);
        console.log(`✅ ${key} added to .env file`);
      }
    } else {
      // Create new .env file
      fs.writeFileSync(envPath, envContent.slice(1)); // Remove leading newline for new file
      console.log(`✅ .env file created with ${key}`);
    }
  } catch (error) {
    console.error("❌ Error saving token to .env file:", error.message);
  }
};

export default saveInputToEnvFile;
