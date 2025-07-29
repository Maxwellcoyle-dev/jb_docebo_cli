import fs from "fs";
import { parse } from "csv-parse";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Function to detect and format dates
const formatDate = (value) => {
  if (!value || typeof value !== "string") {
    return value;
  }

  // Try to parse the date
  const date = new Date(value);

  // Check if it's a valid date
  if (isNaN(date.getTime())) {
    return value; // Not a date, return original value
  }

  // Format to YYYY-MM-DD HH:MM:SS
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Function to process a single record and format dates
const processRecord = (record) => {
  const processedRecord = {};

  for (const [key, value] of Object.entries(record)) {
    // Check if the key suggests it might be a date
    const isDateField = /date|time|created|updated|start|end|due/i.test(key);

    if (isDateField) {
      processedRecord[key] = formatDate(value);
    } else {
      processedRecord[key] = value;
    }
  }

  return processedRecord;
};

const csvParser = async (fileName, chunkSize = 200) => {
  const filePath = path.join(process.cwd(), fileName);
  const parser = fs.createReadStream(filePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  const chunks = [];
  let currentChunk = [];

  for await (const record of parser) {
    // Process and format dates during parsing
    const processedRecord = processRecord(record);
    currentChunk.push(processedRecord);

    // When chunk is full, add it to chunks array and start a new one
    if (currentChunk.length === chunkSize) {
      chunks.push(currentChunk);
      currentChunk = [];
    }
  }

  // Add any remaining records as the final chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
};

export default csvParser;
