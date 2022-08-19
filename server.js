const app = require("./app");
const connectDB = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to unhandled exception`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
