const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log" }),
  ],
});

const logError = (err, message = "An error occurred") => {
  if (err instanceof Error) {
    logger.error(message, { error: err.stack });
  } else {
    logger.error(message, { error: err });
  }
};

const handleError = (err, res) => {
  const { statusCode = 500, message } = err;
  logError(err, message);
  res.status(statusCode).json({ error: message });
};

module.exports = {
  logError,
  handleError,
};
