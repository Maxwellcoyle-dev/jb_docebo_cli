const baseUrl = process.env.PLATFORM_URL;

const urlBuilder = (migrationType) => {
  switch (migrationType) {
    case "enrollments":
      const url = `${baseUrl}/learn/v1/enrollment/batch`;
      const httpMethod = "POST";
      return { url, httpMethod };
    default:
      throw new Error("Invalid migration type");
  }
};

export default urlBuilder;
