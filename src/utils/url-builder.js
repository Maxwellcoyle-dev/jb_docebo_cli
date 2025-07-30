const urlBuilder = (migrationType) => {
  const baseUrl = process.env.PLATFORM_URL;

  if (!baseUrl) {
    // Return empty string if no environment variable is set
    return { url: "", httpMethod: "POST" };
  }

  const cleanBase = baseUrl.replace(/\/+$/, "");

  switch (migrationType) {
    case "enrollments":
      const path = "/learn/v1/enrollment/batch";
      const url = new URL(path, cleanBase + "/").toString();
      const httpMethod = "POST";
      return { url, httpMethod };
    default:
      throw new Error("Invalid migration type");
  }
};

export default urlBuilder;
