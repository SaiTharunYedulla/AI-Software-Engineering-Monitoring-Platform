// ============================================================================
// Request Logging Middleware
// ============================================================================
// This file contains middleware for logging incoming HTTP requests using
// Winston. It captures request details such as method, URL, status code,
// and response time.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url, ip, headers } = req;
  const userAgent = headers["user-agent"];

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const logDetails = {
      method,
      url,
      statusCode,
      duration,
      ip,
      userAgent,
    };

    if (statusCode >= 400) {
      logger.error(`HTTP Request`, logDetails);
    } else {
      logger.info(`HTTP Request`, logDetails);
    }
  });

  next();
};

export default requestLogger;
