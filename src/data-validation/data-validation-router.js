import enrollments from "./enrollments.js";

const dataValidationRouter = (migrationType, data) => {
  switch (migrationType) {
    case "enrollments":
      return enrollments(data);
    default:
      console.log("No migration type found");
  }
};

export default dataValidationRouter;
