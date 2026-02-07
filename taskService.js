const { validateTask, TaskSchema } = require("./taskValidator");

class TaskService {
  constructor(taskRepository) {
    this.repository = taskRepository;
  }

  /**
   * Creates a new task
   * Business rules:
   * 1. Validate task data
   * 2. Add metadata (createdAt, id from DB)
   * 3. Save to database via repository
   */
  async createTask(taskData) {
    const { isValid, errors } = validateTask(TaskSchema, taskData);
    if (!isValid) {
      throw new Error(`Validation failed: ${errors.join(", ")}`);
    }
    return await this.repository.create(taskData);
  }
}

module.exports = TaskService;
