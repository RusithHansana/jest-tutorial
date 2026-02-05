# Unit Testing with Jest

A beginner-friendly tutorial project for learning the fundamentals of unit testing with Jest.

## What is Unit Testing?

Unit testing is a software testing method where individual units or components of a software are tested in isolation. The goal is to validate that each unit of the software performs as expected.

### Benefits of Unit Testing

- **Early Bug Detection**: Catch bugs during development
- **Code Quality**: Encourages better code structure and modularity
- **Refactoring Safety**: Tests ensure changes don't break existing functionality
- **Documentation**: Tests serve as living documentation of expected behavior

## What is Jest?

Jest is a JavaScript testing framework developed by Facebook (now Meta). It's designed to be zero-configuration and provides everything you need to write and run tests.

### Key Features

- **Zero Configuration**: Works out of the box
- **Fast and Parallel**: Runs tests in parallel for speed
- **Built-in Matchers**: Rich set of assertion methods
- **Mocking Support**: Easy mocking of functions and modules
- **Watch Mode**: Automatically re-runs tests on file changes
- **Coverage Reports**: Built-in code coverage reporting

## Getting Started

### Installation

```bash
npm install --save-dev jest
```

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch
```

## Basic Concepts

### Test Structure

Tests are organized using `describe` blocks (test suites) and `test` blocks (individual tests):

```javascript
describe("Component Name", () => {
  test("should do something", () => {
    // Test code here
  });
});
```

### Assertions with `expect`

Jest uses `expect` for assertions. Here are some common matchers:

```javascript
expect(result).toBe(expectedValue);        // Strict equality
expect(result).toEqual(expectedObject);     // Deep equality for objects
expect(result).toBeTruthy();                // Truthy check
expect(result).toBeFalsy();                 // Falsy check
expect(result).toContain(item);             // Array/string contains
expect(result).toHaveLength(length);        // Check array length
expect(result).toThrow(error);              // Function throws error
```

## Project Examples

This project contains two examples to demonstrate different testing scenarios:

### 1. Simple Function Testing (`sum.js`)

The `sum` function is a basic arithmetic function that adds two numbers:

```javascript
function sum(a, b) {
  return a + b;
}
```

**Test File**: `sum.test.js`

- Tests basic addition
- Tests with negative numbers
- Demonstrates simple assertions

### 2. Complex Validation Testing (`taskValidator.js`)

The `taskValidator` module provides schema-based validation for task objects with fields like title, status, priority, and description.

**Test File**: `taskValidator.test.js`

- Tests required field validation
- Tests data type validation
- Tests length constraints
- Tests enum validation
- Tests optional fields
- Tests extra field rejection

## Writing Good Tests

### AAA Pattern (Arrange, Act, Assert)

1. **Arrange**: Set up the test data and environment
2. **Act**: Execute the code being tested
3. **Assert**: Verify the expected outcome

```javascript
test("should validate task title", () => {
  // Arrange
  const validTask = {
    title: "Complete project",
    status: "pending",
    priority: "high"
  };

  // Act
  const result = validateTask(TaskSchema, validTask);

  // Assert
  expect(result.isValid).toBe(true);
  expect(result.errors).toHaveLength(0);
});
```

### Test Naming

Use descriptive test names that explain what behavior is being tested:

```javascript
// Good
test("should fail when title is missing")

// Bad
test("title test")
```

## Running the Tests

To run the tests in this project:

```bash
npm test
```

You should see output showing which tests passed and failed, along with any error messages.

## Next Steps

Once you're comfortable with the basics:

1. Learn about mocking with `jest.fn()` and `jest.mock()`
2. Explore test coverage with `jest --coverage`
3. Study asynchronous testing patterns
4. Look into testing frameworks like React Testing Library for UI components

## Resources

- [Jest Official Documentation](https://jestjs.io/docs/getting-started)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Testing JavaScript Applications](https://testingjavascript.com/)
