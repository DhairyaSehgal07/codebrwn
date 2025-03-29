import winston from "winston";

// Create a custom logger
const logger = winston.createLogger({
  level: "info", // Set the minimum level of messages to log
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log entry
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      // Output to console
      level: "info",
    }),
  ],
});

// Optional: Add a catch-all for unhandled rejections
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

export default logger;
