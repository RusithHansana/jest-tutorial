/**
 * Task Repository - Handles database operations
 * In production, this would use a real database (PostgreSQL, MongoDB, etc.)
 */
class TaskRepository {
  constructor(database) {
    this.db = database;
  }

  async create(taskData) {
    // In production: INSERT INTO tasks ...
    // Returns the created task with id and timestamps
  }

  async findById(taskId) {
    // In production: SELECT * FROM tasks WHERE id = ?
    // Returns task object or null
  }

  async findAll(filters = {}) {
    // In production: SELECT * FROM tasks WHERE ...
    // Returns array of tasks
  }

  async update(taskId, updates) {
    // In production: UPDATE tasks SET ... WHERE id = ?
    // Returns updated task or null if not found
  }

  async delete(taskId) {
    // In production: DELETE FROM tasks WHERE id = ?
    // Returns true if deleted, false if not found
  }
}

module.exports = TaskRepository;
