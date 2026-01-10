/**
 * Test Suite for Data Processor Utilities
 * 
 * Comprehensive tests for data validation, sanitization, and processing functions.
 * Uses Jest testing framework with detailed assertions and edge case coverage.
 * 
 * @author Claude AI
 * @version 1.0.0
 */

const {
  validateAndSanitize,
  sanitizeString,
  processArray,
  benchmark
} = require('../utils/dataProcessor');

describe('Data Processor Utilities', () => {
  
  describe('validateAndSanitize', () => {
    test('should validate and sanitize valid data', () => {
      const data = {
        name: '  John Doe  ',
        email: 'john@example.com',
        age: 30
      };

      const schema = {
        name: { type: 'string', required: true, trim: true, minLength: 2 },
        email: { type: 'string', required: true },
        age: { type: 'number', required: false }
      };

      const result = validateAndSanitize(data, schema);

      expect(result).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      });
    });

    test('should throw error for missing required field', () => {
      const data = { email: 'john@example.com' };
      const schema = {
        name: { type: 'string', required: true },
        email: { type: 'string', required: true }
      };

      expect(() => validateAndSanitize(data, schema))
        .toThrow('Missing required field: name');
    });

    test('should throw error for invalid data type', () => {
      const data = { name: 123 };
      const schema = { name: { type: 'string', required: true } };

      expect(() => validateAndSanitize(data, schema))
        .toThrow('Invalid type for name: Expected string, got number');
    });

    test('should handle optional fields correctly', () => {
      const data = { name: 'John' };
      const schema = {
        name: { type: 'string', required: true },
        age: { type: 'number', required: false }
      };

      const result = validateAndSanitize(data, schema);
      expect(result).toEqual({ name: 'John' });
    });

    test('should throw error for invalid input types', () => {
      expect(() => validateAndSanitize(null, {}))
        .toThrow('Invalid data: Expected object');
      
      expect(() => validateAndSanitize({}, null))
        .toThrow('Invalid schema: Expected object');
    });
  });

  describe('sanitizeString', () => {
    test('should trim whitespace by default', () => {
      const result = sanitizeString('  hello world  ');
      expect(result).toBe('hello world');
    });

    test('should strip HTML tags when requested', () => {
      const input = '<script>alert("xss")</script>Hello <b>World</b>!';
      const result = sanitizeString(input, { stripHtml: true });
      expect(result).toBe('alert("xss")Hello World!');
    });

    test('should escape special characters when requested', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeString(input, { escape: true });
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    test('should enforce maximum length', () => {
      const input = 'This is a very long string';
      expect(() => sanitizeString(input, { maxLength: 10 }))
        .toThrow('String too long: Maximum 10 characters');
    });

    test('should enforce minimum length', () => {
      const input = 'Hi';
      expect(() => sanitizeString(input, { minLength: 5 }))
        .toThrow('String too short: Minimum 5 characters');
    });

    test('should handle non-string input gracefully', () => {
      expect(sanitizeString(123)).toBe(123);
      expect(sanitizeString(null)).toBe(null);
      expect(sanitizeString(undefined)).toBe(undefined);
    });

    test('should combine multiple sanitization rules', () => {
      const input = '  <script>alert("test")</script>  ';
      const result = sanitizeString(input, {
        trim: true,
        stripHtml: true,
        escape: true
      });
      expect(result).toBe('alert(&quot;test&quot;)');
    });
  });

  describe('processArray', () => {
    test('should remove null and undefined values', () => {
      const input = [1, null, 2, undefined, 3];
      const result = processArray(input, { removeNulls: true });
      expect(result).toEqual([1, 2, 3]);
    });

    test('should remove duplicates', () => {
      const input = [1, 2, 2, 3, 3, 3, 4];
      const result = processArray(input, { removeDuplicates: true });
      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('should sort array with default comparator', () => {
      const input = [3, 1, 4, 1, 5];
      const result = processArray(input, { sort: true });
      expect(result).toEqual([1, 1, 3, 4, 5]);
    });

    test('should sort array with custom comparator', () => {
      const input = [3, 1, 4, 1, 5];
      const result = processArray(input, { 
        sort: (a, b) => b - a // Descending order
      });
      expect(result).toEqual([5, 4, 3, 1, 1]);
    });

    test('should transform array elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = processArray(input, {
        transform: x => x * 2
      });
      expect(result).toEqual([2, 4, 6, 8, 10]);
    });

    test('should limit array length', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = processArray(input, { limit: 5 });
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('should combine multiple processing options', () => {
      const input = [3, 1, null, 4, 1, 5, undefined, 9, 2];
      const result = processArray(input, {
        removeNulls: true,
        removeDuplicates: true,
        sort: (a, b) => a - b,
        limit: 4
      });
      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('should throw error for non-array input', () => {
      expect(() => processArray('not an array'))
        .toThrow('Invalid input: Expected array');
      
      expect(() => processArray(null))
        .toThrow('Invalid input: Expected array');
    });

    test('should return copy of original array when no options provided', () => {
      const input = [1, 2, 3];
      const result = processArray(input);
      
      expect(result).toEqual(input);
      expect(result).not.toBe(input); // Should be a different array instance
    });
  });

  describe('benchmark', () => {
    test('should measure execution time for successful function', () => {
      const testFunction = (x, y) => x + y;
      const result = benchmark(testFunction, 5, 3);

      expect(result.success).toBe(true);
      expect(result.result).toBe(8);
      expect(typeof result.executionTime).toBe('number');
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
    });

    test('should handle function errors gracefully', () => {
      const errorFunction = () => {
        throw new Error('Test error');
      };
      
      const result = benchmark(errorFunction);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
      expect(typeof result.executionTime).toBe('number');
      expect(result.result).toBeUndefined();
    });

    test('should throw error for non-function input', () => {
      expect(() => benchmark('not a function'))
        .toThrow('Invalid input: Expected function');
    });

    test('should pass arguments correctly to benchmarked function', () => {
      const testFunction = (...args) => args.reduce((sum, val) => sum + val, 0);
      const result = benchmark(testFunction, 1, 2, 3, 4, 5);

      expect(result.success).toBe(true);
      expect(result.result).toBe(15);
    });
  });

  describe('Integration Tests', () => {
    test('should process user registration data end-to-end', () => {
      const rawUserData = {
        username: '  <script>alert("xss")</script>johndoe  ',
        email: 'JOHN@EXAMPLE.COM',
        age: 25,
        interests: ['coding', 'music', 'coding', null, 'sports', undefined]
      };

      // Step 1: Validate and sanitize basic fields
      const userSchema = {
        username: { 
          type: 'string', 
          required: true, 
          trim: true, 
          stripHtml: true, 
          minLength: 3,
          maxLength: 20
        },
        email: { type: 'string', required: true },
        age: { type: 'number', required: true }
      };

      const sanitizedUser = validateAndSanitize(rawUserData, userSchema);

      // Step 2: Process interests array
      const processedInterests = processArray(rawUserData.interests, {
        removeNulls: true,
        removeDuplicates: true,
        sort: true
      });

      const finalUser = {
        ...sanitizedUser,
        interests: processedInterests
      };

      expect(finalUser).toEqual({
        username: 'alert("xss")johndoe',
        email: 'JOHN@EXAMPLE.COM',
        age: 25,
        interests: ['coding', 'music', 'sports']
      });
    });

    test('should benchmark data processing pipeline', () => {
      const testData = Array.from({ length: 1000 }, (_, i) => i);
      
      const processingPipeline = (data) => {
        return processArray(data, {
          removeDuplicates: true,
          sort: (a, b) => b - a,
          limit: 100
        });
      };

      const benchmarkResult = benchmark(processingPipeline, testData);

      expect(benchmarkResult.success).toBe(true);
      expect(benchmarkResult.result).toHaveLength(100);
      expect(benchmarkResult.result[0]).toBe(999); // Highest number first
      expect(benchmarkResult.executionTime).toBeGreaterThan(0);
    });
  });
});

// Performance Tests (can be run separately)
describe('Performance Tests', () => {
  test('should handle large datasets efficiently', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100);
    
    const startTime = Date.now();
    const result = processArray(largeArray, {
      removeDuplicates: true,
      sort: true
    });
    const endTime = Date.now();

    expect(result).toHaveLength(100);
    expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
  });

  test('should sanitize strings efficiently', () => {
    const longString = 'a'.repeat(10000);
    
    const startTime = Date.now();
    const result = sanitizeString(longString, {
      trim: true,
      escape: true
    });
    const endTime = Date.now();

    expect(result).toHaveLength(10000);
    expect(endTime - startTime).toBeLessThan(50); // Should complete in under 50ms
  });
});

// Export test utilities for reuse
module.exports = {
  // Helper functions for other test files
  createMockUser: () => ({
    name: 'Test User',
    email: 'test@example.com',
    age: 25
  }),
  
  createUserSchema: () => ({
    name: { type: 'string', required: true, minLength: 2 },
    email: { type: 'string', required: true },
    age: { type: 'number', required: false }
  })
};