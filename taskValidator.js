/**
 * Task Schema
 * Mirrors to a real database schema for tasks
 */
const TaskStatusEnum = ["pending", "in-progress", "completed"];
const TaskPriorityEnum = ["low", "medium", "high"];

const TaskSchema = {
  title: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 100,
    validate: (value) => {
      if (typeof value !== "string") return false;
      const titleLength = value.trim().length;
      return titleLength >= 3 && titleLength <= 100;
    },
  },
  status: {
    type: "string",
    required: true,
    enum: TaskStatusEnum,
    validate: (value) => TaskStatusEnum.includes(value),
  },
  priority: {
    type: "string",
    required: true,
    enum: TaskPriorityEnum,
    validate: (value) => TaskPriorityEnum.includes(value),
  },
  description: {
    type: "string",
    required: false,
    minLength: 0,
    maxLength: 500,
    validate: (value) => {
      if (value === undefined) return true; // optional field
      if (typeof value !== "string") return false;
      const descriptionLength = value.trim().length;
      return descriptionLength <= 500;
    },
  },
};

/**
 * Validates task data before creation/update
 * @param {Object} taskData - The task to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateTask(taskSchema, taskData) {
  if (!taskData || typeof taskData !== "object") {
    return {
      isValid: false,
      errors: ["Task data must be a valid object."],
    };
  }

  const errors = [];

  Object.entries(taskSchema).forEach(([fieldName, schema]) => {
    const value = taskData[fieldName];

    // Validate required fields
    if (schema.required && (value === undefined || value === null)) {
      errors.push(`Field "${fieldName}" is required.`);
      return;
    }

    // Skip validation for optional fields if not provided
    if (!schema.required && (value === undefined || value === null)) {
      return;
    }

    // Validate type
    if (schema.type && typeof value !== schema.type) {
      errors.push(`Field "${fieldName}" must be of type ${schema.type}.`);
      return;
    }

    // Validate enum if applicable
    if (schema.enum && !schema.enum.includes(value)) {
      errors.push(
        `Field "${fieldName}" must be one of: ${schema.enum.join(", ")}.`,
      );
      return;
    }

    // Validation in the schema
    if (schema.validate && !schema.validate(value)) {
      const errorMessage = schema.enum
        ? `Field "${fieldName}" must be one of: ${schema.enum.join(", ")}.`
        : schema.maxLength
          ? `Field "${fieldName}" must be between ${schema.minLength || 0} and ${schema.maxLength} characters long.`
          : `Field "${fieldName}" is invalid.`;
      errors.push(errorMessage);
    }

    // Validation for extra fields (not defined in the schema)
    const validFields = Object.keys(taskSchema);
    const extraFields = Object.keys(taskData).filter(
      (key) => !validFields.includes(key),
    );

    if (extraFields.length > 0) {
      errors.push(`Extra fields are not allowed: ${extraFields.join(", ")}.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = { TaskSchema, validateTask };
