const baseUrl = process.env.PLATFORM_URL;

const cleanBase = baseUrl.replace(/\/+$/, "");

const urlBuilder = (migrationType) => {
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
