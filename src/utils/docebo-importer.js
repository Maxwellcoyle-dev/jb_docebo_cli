import axios from "axios";
import dotenv from "dotenv";

import urlBuilder from "./url-builder.js";

dotenv.config();

const token = process.env.API_TOKEN;

const doceboImporter = async (chunks, migrationType) => {
  const { url, httpMethod } = urlBuilder(migrationType);

  console.log(`🚀 Starting migration to Docebo`);
  console.log(`📊 Processing ${chunks.length} chunks...`);

  const results = [];
  let totalProcessed = 0;
  let totalRecords = chunks.reduce((sum, chunk) => sum + chunk.length, 0);

  console.log(`📈 Total records: ${totalRecords}`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkNumber = i + 1;
    const chunkSize = chunk.length;

    console.log(
      `\n📦 Chunk ${chunkNumber}/${chunks.length} (${chunkSize} records)`
    );

    try {
      const requestBody = {
        items: chunk,
      };

      const response = await axios({
        url,
        method: httpMethod,
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      totalProcessed += chunkSize;
      results.push({
        chunkNumber,
        success: true,
        recordsProcessed: chunkSize,
        response: response.data,
      });

      console.log(`✅ Success - ${chunkSize} records imported`);
      console.log(
        `📊 Progress: ${totalProcessed}/${totalRecords} (${Math.round(
          (totalProcessed / totalRecords) * 100
        )}%)`
      );

      // Small delay between chunks
      if (i < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.log(`❌ Failed - ${error.response?.status || "Unknown error"}`);
      if (error.response?.data) {
        console.log(`   Details: ${JSON.stringify(error.response.data)}`);
      }

      results.push({
        chunkNumber,
        success: false,
        recordsProcessed: 0,
        error: error.message,
        response: error.response?.data,
      });

      console.log(`⚠️  Continuing with next chunk...`);
    }
  }

  // Final summary
  const successfulChunks = results.filter((r) => r.success).length;
  const failedChunks = results.filter((r) => !r.success).length;
  const totalSuccessfulRecords = results
    .filter((r) => r.success)
    .reduce((sum, r) => sum + r.recordsProcessed, 0);

  console.log("\n" + "=".repeat(50));
  console.log("📋 MIGRATION COMPLETE");
  console.log("=".repeat(50));
  console.log(`✅ Success: ${successfulChunks}/${chunks.length} chunks`);
  console.log(`❌ Failed: ${failedChunks}/${chunks.length} chunks`);
  console.log(`📊 Records: ${totalSuccessfulRecords}/${totalRecords} imported`);
  console.log(
    `📈 Success Rate: ${Math.round(
      (totalSuccessfulRecords / totalRecords) * 100
    )}%`
  );

  if (failedChunks > 0) {
    console.log(
      `\n⚠️  ${failedChunks} chunks failed. Check logs above for details.`
    );
  }

  return {
    summary: {
      totalChunks: chunks.length,
      successfulChunks,
      failedChunks,
      totalRecords,
      successfulRecords: totalSuccessfulRecords,
      successRate: Math.round((totalSuccessfulRecords / totalRecords) * 100),
    },
    results,
  };
};

export default doceboImporter;
