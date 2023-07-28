import { Injectable, Logger, Scope } from "@nestjs/common";
import { config } from "../../config/config";

var winston = require("winston");
require("winston-daily-rotate-file");
require("events").EventEmitter.defaultMaxListeners = 100;
const { combine, timestamp, label, printf } = winston.format;

var logInfo = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-info.log",
  datePattern: "YYYY-MM-DD",
  prepend: false,
  level: "info",
  maxDays: 0,
});

var logDebug = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-debug.log",
  datePattern: "YYYY-MM-DD",
  prepend: false,
  level: "debug",
  maxDays: 0,
});

var logError = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  prepend: false,
  level: "error",
  maxDays: 0,
});

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) =>
      `${info.timestamp}: [${info.label}]: [${info.level}]: [${info.filename}] : [${info.line}] - ${info.message}`
  )
);

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  private loggerInfo = winston.createLogger({
    format: logFormat,
    transports: [logInfo],
  });

  private loggerError = winston.createLogger({
    format: logFormat,
    transports: [logError],
  });

  private loggerDebug = winston.createLogger({
    format: logFormat,
    transports: [logDebug],
  });
  error(message: any, trace?: string, context?: string) {
    // TO DO
    this.loggerError.error(message, trace, context);
  }

  warn(message: any, context?: string) {
    this.loggerInfo.info(message, context);
  }

  log(message: any, context?: string) {
    // TO DO
    const mode = config.get("logger.mode");
    if (mode == "dev") {
      this.loggerInfo.info(message, context);
    }
  }

  debug(message: any, context?: string) {
    // TO DO
    const mode = config.get("logger.mode");
    if (mode == "dev") {
      this.loggerDebug.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    // TO DO
    const mode = config.get("logger.mode");
    if (mode == "dev") {
      this.loggerInfo.info(message, context);
    }
  }
}
