import { getTimestamp } from "../../helper/getTimestamp.ts";

import type { LogType } from "./types/LogType.ts";
import type { LogTypeData } from "./types/LogTypeData.ts";

export class Logger {
  private styles: Record<LogType, LogTypeData> = {
    INFO:  { color: '\x1b[36m', emoji: 'ℹ️' },
    SUCCESS:  { color: '\x1b[32m', emoji: '✅' },
    ERROR: { color: '\x1b[31m', emoji: '❌'},
  };

  private reset = '\x1b[0m';

  private log(type: LogType, message: string) {
    const { color, emoji } = this.styles[type];
    const timestamp = getTimestamp();
    
    console.log(
      `${color}${emoji}  [${type}] ${timestamp} — ${message}${this.reset}`
    );
  }

  info(message: string) {
    this.log('INFO', message);
  }

  success(message: string) {
    this.log('SUCCESS', message);
  }

  error(message: string) {
    this.log('ERROR', message);
  }
}