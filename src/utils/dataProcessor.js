/**
 * Data Processing Utilities
 * 
 * A collection of utility functions for data manipulation and validation.
 * Demonstrates modern JavaScript patterns and best practices.
 * 
 * @author Claude AI
 * @version 1.0.0
 */

/**
 * Validates and sanitizes user input data
 * @param {Object} data - Raw input data
 * @param {Object} schema - Validation schema
 * @returns {Object} Sanitized and validated data
 * @throws {Error} If validation fails
 */
function validateAndSanitize(data, schema) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data: Expected object');
  }

  if (!schema || typeof schema !== 'object') {
    throw new Error('Invalid schema: Expected object');
  }

  const sanitized = {};

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];

    // Check required fields
    if (rules.required && (value === undefined || value === null)) {
      throw new Error(`Missing required field: ${key}`);
    }

    // Skip optional fields that are not provided
    if (!rules.required && (value === undefined || value === null)) {
      continue;
    }

    // Type validation
    if (rules.type && typeof value !== rules.type) {
      throw new Error(`Invalid type for ${key}: Expected ${rules.type}, got ${typeof value}`);
    }

    // String sanitization
    if (rules.type === 'string') {
      sanitized[key] = sanitizeString(value, rules);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Sanitizes string input to prevent XSS attacks
 * @param {string} str - Input string
 * @param {Object} rules - Sanitization rules
 * @returns {string} Sanitized string
 */
function sanitizeString(str, rules = {}) {
  if (typeof str !== 'string') {
    return str;
  }

  let sanitized = str;

  // Trim whitespace
  if (rules.trim !== false) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags
  if (rules.stripHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  // Escape special characters
  if (rules.escape) {
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  // Length validation
  if (rules.maxLength && sanitized.length > rules.maxLength) {
    throw new Error(`String too long: Maximum ${rules.maxLength} characters`);
  }

  if (rules.minLength && sanitized.length < rules.minLength) {
    throw new Error(`String too short: Minimum ${rules.minLength} characters`);
  }

  return sanitized;
}

/**
 * Processes array data with filtering and transformation
 * @param {Array} array - Input array
 * @param {Object} options - Processing options
 * @returns {Array} Processed array
 */
function processArray(array, options = {}) {
  if (!Array.isArray(array)) {
    throw new Error('Invalid input: Expected array');
  }

  let result = [...array]; // Create a copy

  // Filter out null/undefined values
  if (options.removeNulls) {
    result = result.filter(item => item !== null && item !== undefined);
  }

  // Remove duplicates
  if (options.removeDuplicates) {
    result = [...new Set(result)];
  }

  // Sort array
  if (options.sort) {
    if (typeof options.sort === 'function') {
      result.sort(options.sort);
    } else {
      result.sort();
    }
  }

  // Transform items
  if (options.transform && typeof options.transform === 'function') {
    result = result.map(options.transform);
  }

  // Limit results
  if (options.limit && typeof options.limit === 'number') {
    result = result.slice(0, options.limit);
  }

  return result;
}

/**
 * Calculates performance metrics for data processing
 * @param {Function} fn - Function to benchmark
 * @param {Array} args - Arguments to pass to function
 * @returns {Object} Performance metrics
 */
function benchmark(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('Invalid input: Expected function');
  }

  const startTime = performance.now();
  const startMemory = process.memoryUsage();

  try {
    const result = fn(...args);
    const endTime = performance.now();
    const endMemory = process.memoryUsage();

    return {
      result,
      executionTime: endTime - startTime,
      memoryUsed: endMemory.heapUsed - startMemory.heapUsed,
      success: true
    };
  } catch (error) {
    const endTime = performance.now();

    return {
      error: error.message,
      executionTime: endTime - startTime,
      success: false
    };
  }
}

// Export functions for use in other modules
module.exports = {
  validateAndSanitize,
  sanitizeString,
  processArray,
  benchmark
};

// Example usage (for testing purposes)
if (require.main === module) {
  console.log('🧪 Running Data Processor Examples...\n');

  // Example 1: Data validation
  try {
    const userData = {
      name: '  John Doe  ',
      email: 'john@example.com',
      age: 30
    };

    const userSchema = {
      name: { type: 'string', required: true, trim: true, minLength: 2 },
      email: { type: 'string', required: true },
      age: { type: 'number', required: false }
    };

    const validatedUser = validateAndSanitize(userData, userSchema);
    console.log('✅ Validated User:', validatedUser);
  } catch (error) {
    console.error('❌ Validation Error:', error.message);
  }

  // Example 2: Array processing
  const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const processed = processArray(numbers, {
    removeDuplicates: true,
    sort: (a, b) => a - b,
    limit: 5
  });
  console.log('✅ Processed Array:', processed);

  // Example 3: Performance benchmarking
  const benchmarkResult = benchmark(processArray, numbers, { removeDuplicates: true });
  console.log('✅ Benchmark Result:', {
    executionTime: `${benchmarkResult.executionTime.toFixed(2)}ms`,
    success: benchmarkResult.success
  });
}