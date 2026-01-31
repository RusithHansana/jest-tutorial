const { TaskSchema, validateTask } = require("./taskValidator");

describe("validateTask", () => {
  describe("title validation", () => {
    test("should pass when title is valid", () => {
      // ARRANGE
      const validTask = {
        title: "Complete project documentation",
        status: "pending",
        priority: "high",
      };

      // ACT
      const result = validateTask(TaskSchema, validTask);

      // ASSERT
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should fail when title is missing", () => {
      const invalidTask = {
        status: "pending",
        priority: "high",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(`Field "title" is required.`);
    });

    test("should fail when title is too short( < 3)", () => {
      const invalidTask = {
        title: "ab",
        status: "pending",
        priority: "high",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(
        `Field "title" must be between 3 and 100 characters long.`,
      );
    });

    test("should fail when title is too long( > 100)", () => {
      const invalidTask = {
        title: "a".repeat(101),
        status: "pending",
        priority: "high",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(
        `Field "title" must be between 3 and 100 characters long.`,
      );
    });
  });

  describe("status validation", () => {
    test("should pass when status is valid", () => {
      const validTask = {
        title: "Task with valid status",
        status: "in-progress",
        priority: "medium",
      };

      const result = validateTask(TaskSchema, validTask);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should fail when status is invalid", () => {
      const invalidTask = {
        title: "Task with invalid status",
        status: "done",
        priority: "medium",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(
        `Field "status" must be one of: pending, in-progress, completed.`,
      );
    });

    test("should fail when status is missing", () => {
      const invalidTask = {
        title: "Task with missing status",
        priority: "medium",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(`Field "status" is required.`);
    });
  });

  describe("priority validation", () => {
    test("should pass when priority is valid", () => {
      const validTask = {
        title: "Task with valid priority",
        status: "pending",
        priority: "low",
      };

      const result = validateTask(TaskSchema, validTask);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // Test for invalid priority
    test("should fail when priority is invalid", () => {
      const invalidTask = {
        title: "Task with invalid priority",
        status: "pending",
        priority: "urgent",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(
        `Field "priority" must be one of: low, medium, high.`,
      );
    });

    test("should fail when priority is missing", () => {
      const invalidTask = {
        title: "Task with missing priority",
        status: "pending",
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(`Field "priority" is required.`);
    });
  });

  describe("description validation", () => {
    test("should pass when description is optional", () => {
      const validTask = {
        title: "Task without description",
        status: "pending",
        priority: "medium",
      };

      const result = validateTask(TaskSchema, validTask);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should fail when description is too long (> 500)", () => {
      const invalidTask = {
        title: "Task with long description",
        status: "pending",
        priority: "medium",
        description: "a".repeat(501),
      };

      const result = validateTask(TaskSchema, invalidTask);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain(
        `Field "description" must be between 0 and 500 characters long.`,
      );
    });
  });
});
