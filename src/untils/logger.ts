// src/utils/logger.ts
import { createLogger, transports, format, Logger } from 'winston';

const logger: Logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] - ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log' }),
  ],
});

export default logger;
