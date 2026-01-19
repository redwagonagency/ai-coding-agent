const express = require('express');
const router = express.Router();

/**
 * Comprehensive health check system
 * Monitors application, database, external services, and system resources
 */

class HealthChecker {
  constructor() {
    this.checks = new Map();
    this.setupDefaultChecks();
  }

  /**
   * Register a health check
   * @param {string} name - Check name
   * @param {Function} checkFn - Async function that returns check result
   * @param {number} timeout - Timeout in milliseconds
   */
  registerCheck(name, checkFn, timeout = 5000) {
    this.checks.set(name, { checkFn, timeout });
  }

  /**
   * Run all health checks
   * @returns {Object} Health check results
   */
  async runChecks() {
    const results = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {},
      summary: {
        total: this.checks.size,
        passed: 0,
        failed: 0,
        duration: 0
      }
    };

    const startTime = Date.now();

    // Run all checks in parallel
    const checkPromises = Array.from(this.checks.entries()).map(
      async ([name, { checkFn, timeout }]) => {
        const checkStart = Date.now();
        
        try {
          // Add timeout to each check
          const result = await Promise.race([
            checkFn(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);

          const duration = Date.now() - checkStart;
          
          results.checks[name] = {
            status: 'pass',
            duration,
            ...result
          };
          
          results.summary.passed++;
        } catch (error) {
          const duration = Date.now() - checkStart;
          
          results.checks[name] = {
            status: 'fail',
            duration,
            error: error.message,
            details: error.details || null
          };
          
          results.summary.failed++;
          results.status = 'unhealthy';
        }
      }
    );

    await Promise.all(checkPromises);
    
    results.summary.duration = Date.now() - startTime;
    
    return results;
  }

  /**
   * Setup default health checks
   */
  setupDefaultChecks() {
    // Application health
    this.registerCheck('application', async () => {
      return {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
      };
    });

    // Database health
    this.registerCheck('database', async () => {
      const db = require('../config/database');
      
      try {
        const result = await db.query('SELECT 1 as health_check');
        const connectionCount = await db.query(
          'SELECT count(*) as connections FROM pg_stat_activity'
        );
        
        return {
          connected: true,
          connections: parseInt(connectionCount.rows[0].connections),
          responseTime: 'fast'
        };
      } catch (error) {
        throw new Error(`Database connection failed: ${error.message}`);
      }
    });

    // Redis health (if using Redis)
    this.registerCheck('redis', async () => {
      const redis = require('../config/redis');
      
      try {
        const pong = await redis.ping();
        const info = await redis.info('memory');
        
        return {
          connected: pong === 'PONG',
          memory: info.split('\r\n').find(line => line.startsWith('used_memory_human'))
        };
      } catch (error) {
        throw new Error(`Redis connection failed: ${error.message}`);
      }
    });

    // External API health
    this.registerCheck('external_apis', async () => {
      const axios = require('axios');
      const apis = [
        { name: 'payment_gateway', url: process.env.PAYMENT_API_URL },
        { name: 'email_service', url: process.env.EMAIL_API_URL }
      ];

      const results = {};
      
      for (const api of apis) {
        if (!api.url) continue;
        
        try {
          const response = await axios.get(`${api.url}/health`, { timeout: 3000 });
          results[api.name] = {
            status: response.status === 200 ? 'up' : 'down',
            responseTime: response.headers['x-response-time'] || 'unknown'
          };
        } catch (error) {
          results[api.name] = {
            status: 'down',
            error: error.message
          };
        }
      }
      
      return { apis: results };
    });

    // Disk space health
    this.registerCheck('disk_space', async () => {
      const fs = require('fs').promises;
      
      try {
        const stats = await fs.statfs('./');
        const freeSpace = stats.bavail * stats.bsize;
        const totalSpace = stats.blocks * stats.bsize;
        const usedPercentage = ((totalSpace - freeSpace) / totalSpace) * 100;
        
        if (usedPercentage > 90) {
          throw new Error(`Disk usage critical: ${usedPercentage.toFixed(2)}%`);
        }
        
        return {
          freeSpace: `${(freeSpace / 1024 / 1024 / 1024).toFixed(2)} GB`,
          usedPercentage: `${usedPercentage.toFixed(2)}%`,
          status: usedPercentage > 80 ? 'warning' : 'good'
        };
      } catch (error) {
        throw new Error(`Disk check failed: ${error.message}`);
      }
    });
  }
}

// Create global health checker instance
const healthChecker = new HealthChecker();

// Health check endpoints
router.get('/health', async (req, res) => {
  try {
    const results = await healthChecker.runChecks();
    const statusCode = results.status === 'healthy' ? 200 : 503;
    
    res.status(statusCode).json(results);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check system failed',
      error: error.message
    });
  }
});

// Quick health check (minimal)
router.get('/health/quick', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Detailed system info
router.get('/health/system', async (req, res) => {
  const os = require('os');
  
  res.json({
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      memory: {
        total: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        free: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        usage: `${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%`
      },
      loadAverage: os.loadavg(),
      uptime: `${(os.uptime() / 3600).toFixed(2)} hours`
    },
    process: {
      pid: process.pid,
      uptime: `${(process.uptime() / 3600).toFixed(2)} hours`,
      memory: process.memoryUsage(),
      version: process.version
    }
  });
});

module.exports = { router, healthChecker };