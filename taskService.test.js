const TaskService = require("./taskService");

describe("TaskService", () => {
  describe("createTask", () => {
    test("should create task when data is valid", async () => {
      // ARRANGE - Create a mock repository
      const mockRepository = {
        create: jest.fn().mockResolvedValue({
          id: 1,
          title: "Test task",
          status: "pending",
          priority: "high",
          createdAt: new Date("2025-02-07"),
        }),
      };

      const taskService = new TaskService(mockRepository);

      const validTaskData = {
        title: "Test task",
        status: "pending",
        priority: "high",
      };

      // ACT
      const result = await taskService.create(validTaskData);

      // ASSERT
      expect(result).toEqual({
        id: 1,
        title: "Test task",
        status: "pending",
        priority: "high",
        createdAt: new Date("2025-02-07"),
      });

      // VERIFY the repository was called correctly
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledWith(validTaskData);
    });

    // Test for invalid task data
    // Test should verify that repository.create is NOT called

    // Test for repository errors
    // What if repository.create() throws an error?
  });
});
