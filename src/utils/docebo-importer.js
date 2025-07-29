import axios from "axios";
import dotenv from "dotenv";

import urlBuilder from "./url-builder.js";

dotenv.config();

const token = process.env.API_TOKEN;

const doceboImporter = async (data, migrationType) => {
  const { url, httpMethod } = urlBuilder(migrationType);

  // Wrap the data in the expected format
  const requestBody = {
    items: data,
  };

  try {
    const response = await axios({
      url,
      method: httpMethod,
      data: requestBody, // Send the properly formatted request body
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("--------------------------------");
    console.log("API Error Response:", error.response?.data);
    console.log("--------------------------------");
    console.error("❌ Error during migration:", error.message);
    throw error; // Re-throw the error so the calling function knows it failed
  }
};

export default doceboImporter;
