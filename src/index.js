const { connectDb, closeDb } = require("./utils");
const { redisClient } = require("./config");
const app = require("./app");
const PORT = 3001;

let server;
const connectSevers = () => {
  try {
    connectDb()
      .then(() => {
        console.log("✅ DB: Connected");
        server = app.listen(PORT, () => {
          console.log("✅ Server: Connected port:", PORT);
        });
        server.on("error", (err) => {
          console.error("Error connecting to server", err);
          process.exit(1);
        });
      })
      .catch((err) => {
        console.log("Error connecting to db", err);
        process.exit(1);
      });
  } catch {
    console.log("Error connecting to server");
    process.exit(1);
  }
};
connectSevers();
const exitHandler = async (exitCode) => {
  if (server) {
    server.close(async () => {
      console.log("Server closed.");
      await closeDb();
      await redisClient.quit();
      process.exit(exitCode);
    });
  } else {
    await closeDb();
    process.exit(exitCode);
  }
};

const signalExit = (signal) => {
  console.log("Signal received: ", signal);
  exitHandler(0);
};
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection", err);
  exitHandler(1);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  exitHandler(1);
});
process.on("SIGINT", () => signalExit("SIGINT"));
process.on("SIGTERM", () => signalExit("SIGTERM"));
