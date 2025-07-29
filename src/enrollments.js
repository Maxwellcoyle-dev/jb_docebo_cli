const requiredFields = [
  ["user_id", "username"],
  ["course_id", "course_code"],
  ["status"],
];
const allPossibleKeys = [
  "user_id",
  "username",
  "course_id",
  "course_code",
  "status",
  "enrollment_date",
  "completion_date",
];

const enrollments = (data) => {
  const validEnrollments = data.filter((enrollment, index) => {
    // ensure required fields are present - check each required field group
    const requiredFieldsPresent = requiredFields.every((fieldGroup) => {
      return fieldGroup.some((key) => enrollment[key]);
    });

    if (!requiredFieldsPresent) {
      const missingFields = requiredFields
        .filter((fieldGroup) => !fieldGroup.some((key) => enrollment[key]))
        .map((fieldGroup) => fieldGroup.join(" OR "));
      console.log(
        `Row ${index + 1}: Required fields missing: ${missingFields.join(", ")}`
      );
      return false;
    }

    // ensure only permitted keys are present
    const invalidFields = Object.keys(enrollment).filter(
      (key) => !allPossibleKeys.includes(key)
    );
    if (invalidFields.length > 0) {
      console.log(
        `Row ${index + 1}: Invalid fields found: ${invalidFields.join(", ")}`
      );
      return false;
    }

    return true;
  });

  console.log(
    `Valid enrollments: ${validEnrollments.length} out of ${data.length}`
  );
  return validEnrollments;
};

export default enrollments;
