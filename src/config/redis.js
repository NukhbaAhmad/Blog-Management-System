const { createClient } = require("redis");

// Redis client:
const redisClient = new createClient({
  url: "redis://127.0.0.1:6379",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error("Redis max reconnection attempts reached.");
        return new Error("Retrying: Redis max reconnection attempts reached.");
      }
      return Math.min(retries * 2000, 30000);
    },
    connectTimeout: 10000,
  },
});

// Event Listeners
redisClient.on("error", () => {
  console.error("Connection to redis failed.");
});
redisClient.on("connect", () => console.info("🔄 Redis: Connecting..."));
redisClient.on("ready", () => console.info("✅ Redis: Ready and Connected"));
redisClient.on("error", (err) =>
  console.error(`❌ Redis Error: ${err.message}`)
);
redisClient.on("end", () => console.warn("⚠️ Redis: Connection closed"));
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Could not establish initial connection with Redis");
  }
})();

// Health check: true if okay, false if not
const redisHealthCheck = async () => {
  try {
    const ping = await redisClient.ping();
    return ping === "PONG";
  } catch (error) {
    return false;
  }
};

module.exports = { redisClient, redisHealthCheck };
