const { connectDb, closeDb } = require("./utils");
const app = require("./app");
const PORT = 3001;

let server;
const connectSevers = () => {
  try {
    connectDb()
      .then(() => {
        console.log("Connected to db successfull");
        server = app.listen(PORT, () => {
          console.log("Connected to server successfully at port:", PORT);
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
