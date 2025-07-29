import fs from "fs";

const listCsvFiles = () => {
  try {
    const currentDir = process.cwd();
    const csvFiles = fs
      .readdirSync(currentDir)
      .filter((file) => file.endsWith(".csv"));
    return csvFiles;
  } catch (error) {
    console.error("Error listing CSV files:", error);
    return [];
  }
};

export default listCsvFiles;
