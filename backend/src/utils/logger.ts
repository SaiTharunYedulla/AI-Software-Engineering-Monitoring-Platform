// ============================================================================
// Structured Logging with Winston
// ============================================================================
// This file sets up a structured logger using Winston. It provides a
// centralized logging solution with support for multiple transports (console,
// file), JSON formatting, and log level filtering.
// ============================================================================

import winston from "winston";
import { env } from "@configs/env.config";

const { combine, timestamp, printf, json, colorize } = winston.format;

const SENSITIVE_KEYS = [
  "password",
  "token",
  "secret",
  "authorization",
  "apiKey",
];

const maskSensitiveData = winston.format((info) => {
  const newInfo = { ...info };
  const message = JSON.stringify(newInfo, (key, value) => {
    if (
      typeof key === "string" &&
      SENSITIVE_KEYS.some((sensitiveKey) =>
        key.toLowerCase().includes(sensitiveKey),
      )
    ) {
      return "***MASKED***";
    }
    return value;
  });
  return JSON.parse(message);
});

const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  maskSensitiveData(),
  printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  }),
);

const fileFormat = combine(timestamp(), maskSensitiveData(), json());

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
    level: env.LOG_LEVEL,
  }),
];

if (env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: fileFormat,
    }),
  );
}

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: fileFormat,
  transports,
  exitOnError: false,
});

export default logger;
