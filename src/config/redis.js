import redis from 'redis';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a Redis client using the environment variables
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST, // Redis host (e.g., 'redis')
  port: process.env.REDIS_PORT, // Redis port (e.g., 6379)
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error(`Redis error: ${err}`);
});

export default redisClient;
